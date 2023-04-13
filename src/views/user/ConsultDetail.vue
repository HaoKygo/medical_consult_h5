<script setup lang="ts">
import type { ConsultOrderDetail } from '@/types/consult'
import { OrderType } from '@/enums'
import { getConsultOrderDetail } from '@/api/consult'
import { timeOptions, flagOptions } from '@/api/constants'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { showFailToast, showSuccessToast, type PopoverAction } from 'vant'
import { useCancelConsultOrder, useDeleteConsultOrder } from './service'
import { useShowPrescription } from '@/hooks'

const router = useRouter()
// 加载订单详情数据
const rounte = useRoute()
const consultOrder = ref<ConsultOrderDetail>()
onMounted(async () => {
  const res = await getConsultOrderDetail(rounte.params.id as string)
  consultOrder.value = res
})

// 复制订单号
/**
 * 剪切板hook
 * copy 函数=》使用：copy(复制文本)=》copy方法会把传入的文本存储到系统粘贴板
 * copied ref响应变量 =》true 复制成功 | false 复制失败
 * isSupported ref响应变量 =》true 授权支持 | false 未授权不支持
 */
const { copy, copied, isSupported } = useClipboard()
const onCopy = () => {
  if (!isSupported.value) {
    return showFailToast('未授权，不支持复制')
  }
  copy(consultOrder.value?.orderNo || '')
}
// 复制后提示
watch(copied, () => {
  if (copied.value) {
    showSuccessToast('已复制')
  }
})

// 支付弹层控制
const isShowPaySheet = ref(false)

// 取消订单
const { cancelLoading, cancelConsultOrder } = useCancelConsultOrder()

// 删除订单
const { deleteLoading, deleteConsultOrder } = useDeleteConsultOrder(router.back)

// 查看处方
const { showPrescription } = useShowPrescription()

// 未支付订单倒计时提示结束回调
const onCountDownFinish = () => {
  if (consultOrder.value?.countdown) {
    consultOrder.value.countdown = 0
  }
}

// ---- 已完成订单使用 ----
// 控制更多操作显示
const showPopover = ref(false)
// 操作项
const actions = computed<PopoverAction[]>(() => [
  // 没有处方不可以查看
  { text: '查看处方', disabled: !consultOrder.value?.prescriptionId },
  { text: '删除订单' }
])
// 操作项的点击回调
const onSelect = (action: PopoverAction, index: number) => {
  if (index === 0) {
    showPrescription(consultOrder.value?.prescriptionId)
  }
  // 删除订单
  if (index === 1) {
    deleteConsultOrder(consultOrder.value!)
  }
}
</script>

<template>
  <div class="consult-detail-page" v-if="consultOrder">
    <McNavBar middleTitle="问诊详情"></McNavBar>
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 {{ consultOrder.payment }} 元</h3>
        <span
          class="status green"
          :class="{
            orange: consultOrder.status === OrderType.ConsultPayWait,
            green: consultOrder.status === OrderType.ConsultChat
          }"
        >
          {{ consultOrder.statusValue }}
        </span>
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="@/assets/avatar-doctor.svg" alt="doctor avatar" />
        <p class="doctor">
          <span>极速问诊</span>
          <span>{{ consultOrder.docInfo?.name }}</span>
        </p>
        <van-icon name="arrow"></van-icon>
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${consultOrder.patientInfo.name} | ${consultOrder.patientInfo.genderValue} | ${consultOrder.patientInfo.age}岁`"
        />
        <van-cell
          title="患病时长"
          :value="
            timeOptions.find((time) => time.value === consultOrder?.illnessTime)?.label
          "
        />
        <van-cell
          title="就诊情况"
          :value="
            flagOptions.find((flag) => flag.value === consultOrder?.consultFlag)?.label
          "
        />
        <van-cell title="病情描述" :label="consultOrder.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="onCopy">复制</span>
            {{ consultOrder.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="consultOrder.createTime" />
        <van-cell title="应付款" :value="`￥${consultOrder.payment}`" />
        <van-cell
          title="优惠券"
          v-if="consultOrder.couponDeduction"
          :value="`-￥${consultOrder.couponDeduction}`"
        />
        <van-cell
          title="积分抵扣"
          v-if="consultOrder.pointDeduction"
          :value="`-￥${consultOrder.pointDeduction}`"
        />
        <van-cell
          title="实付款"
          :value="`￥${consultOrder.actualPayment}`"
          class="price"
        />
      </van-cell-group>
    </div>
    <!-- 待支付倒计时 -->
    <div
      class="detail-time"
      v-if="consultOrder.status === OrderType.ConsultPayWait && consultOrder.countdown"
    >
      请在
      <van-count-down
        :time="consultOrder.countdown * 1000"
        @finish="onCountDownFinish"
      ></van-count-down>
      内完成支付，超时订单将取消
    </div>

    <!-- 订单状态不同 - 底部可操作项也不同 -->
    <!-- 待支付：取消问诊+去支付 -->
    <div
      class="detail-action van-hairline--top"
      v-if="consultOrder.status === OrderType.ConsultPayWait"
    >
      <div class="price">
        <span>需付款</span>
        <span>{{ `¥${consultOrder.payment}` }}</span>
      </div>
      <van-button
        type="default"
        :loading="cancelLoading"
        @click="cancelConsultOrder(consultOrder!)"
        round
      >
        取消问诊
      </van-button>
      <van-button @click="isShowPaySheet = true" type="primary" round>
        继续支付
      </van-button>
    </div>
    <!-- 待接诊：取消问诊+继续沟通 -->
    <div
      class="detail-action van-hairline--top"
      v-if="consultOrder.status === OrderType.ConsultWait"
    >
      <van-button
        :loading="cancelLoading"
        @click="cancelConsultOrder(consultOrder!)"
        type="default"
        round
      >
        取消问诊
      </van-button>
      <van-button :to="`/room?orderId=${consultOrder.id}`" type="primary" round>
        继续沟通
      </van-button>
    </div>
    <!-- 咨询中：查看处方（如果开了）+继续沟通 -->
    <div
      class="detail-action van-hairline--top"
      v-if="consultOrder.status === OrderType.ConsultChat"
    >
      <van-button
        @click="showPrescription(consultOrder?.prescriptionId)"
        type="default"
        :loading="cancelLoading"
        round
      >
        查看处方
      </van-button>
      <van-button :to="`/room?orderId=${consultOrder.id}`" type="primary" round>
        继续沟通
      </van-button>
    </div>
    <!-- 已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价 -->
    <div
      class="detail-action van-hairline--top"
      v-if="consultOrder.status === OrderType.ConsultComplete"
    >
      <div class="more">
        <van-popover
          :actions="actions"
          @select="onSelect"
          placement="top-start"
          v-model:show="showPopover"
        >
          <template #reference>更多</template>
        </van-popover>
      </div>
      <van-button
        :loading="deleteLoading"
        :to="`/room?orderId=${consultOrder.id}`"
        type="default"
        round
      >
        问诊记录
      </van-button>
      <van-button
        v-if="!consultOrder.evaluateId"
        :to="`/room?orderId=${consultOrder.id}`"
        type="primary"
        round
      >
        去评价
      </van-button>
      <van-button v-else :to="`/room?orderId=${consultOrder.id}`" type="default" round>
        查看评价
      </van-button>
    </div>
    <!-- 已取消：删除订单+咨询其他医生 -->
    <div
      class="detail-action van-hairline--top"
      v-if="consultOrder.status === OrderType.ConsultCancel"
    >
      <van-button
        :loading="deleteLoading"
        @click="deleteConsultOrder(consultOrder!)"
        type="default"
        round
      >
        删除订单
      </van-button>
      <van-button to="/home" type="primary" round>咨询其他医生</van-button>
    </div>

    <!-- 支付弹层 -->
    <McPaySheet
      v-model:show="isShowPaySheet"
      :orderId="consultOrder.id"
      :actualPayment="consultOrder.payment"
    ></McPaySheet>
  </div>
  <div class="consult-detail-page" v-else>
    <McNavBar middleTitle="问诊详情"></McNavBar>
    <van-skeleton title :row="4" style="margin-top: 30px"></van-skeleton>
    <van-skeleton title :row="4" style="margin-top: 30px"></van-skeleton>
  </div>
</template>

<style lang="scss" scoped>
.consult-detail-page {
  padding: 44px 0 110px 0;
  .detail-head {
    height: 140px;
    position: relative;
    padding: 15px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 135px;
      background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }
    .text {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 3px;
      .status {
        color: var(--mc-tag);
        font-size: 16px;
        font-weight: 500;
        &.green {
          color: var(--mc-primary);
        }
        &.orange {
          color: #f2994a;
        }
      }
      .tip {
        width: 100%;
        margin-top: 5px;
        color: var(--mc-text3);
      }
    }
    .card {
      position: relative;
      display: flex;
      align-items: center;
      height: 74px;
      background-color: #fff;
      border-radius: 8px;
      padding: 0 15px;
      box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
      .avatar {
        width: 38px;
        height: 38px;
      }
      .doctor {
        flex: 1;
        padding-left: 15px;
        > span {
          display: block;
          font-size: 16px;
          &:last-child {
            font-size: 13px;
            color: var(--mc-text3);
          }
        }
      }
      .van-icon {
        color: var(--mc-tip);
      }
    }
  }
  .detail-patient {
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--mc-bg);
    }
  }
  .detail-order {
    > h3 {
      padding: 10px 18px;
      font-weight: 400;
    }
    .copy {
      padding: 2px 10px;
      background-color: var(--mc-plain);
      border-radius: 12px;
      border: 1px solid var(--mc-primary);
      font-size: 12px;
      color: var(--mc-primary);
      margin-right: 10px;
    }
    :deep(.van-cell__title) {
      width: 70px;
      flex: none;
    }
    .price :deep(.van-cell__value) {
      font-size: 16px;
      color: var(--mc-price);
    }
  }
  .detail-time {
    position: fixed;
    left: 0;
    bottom: 65px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    background-color: #fff7eb;
    text-align: center;
    font-size: 13px;
    color: #f2994a;
    .van-count-down {
      display: inline;
      color: #f2994a;
    }
  }
  .detail-action {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15px;
    .price {
      flex: 1;
      > span:last-child {
        font-size: 18px;
        color: var(--mc-price);
        padding-left: 5px;
      }
    }
    .van-button {
      margin-left: 10px;
      padding-left: 18px;
      padding-right: 18px;
    }
    :deep(.van-button--default) {
      background-color: var(--mc-bg);
      color: var(--mc-text3);
    }
    .more {
      flex: 1;
      color: var(--mc-tag);
    }
  }
  .van-cell {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
