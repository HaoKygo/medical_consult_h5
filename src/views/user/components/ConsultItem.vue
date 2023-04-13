<script setup lang="ts">
import type { ConsultOrderDetail } from '@/types/consult'
import { OrderType } from '@/enums'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import type { PopoverAction } from 'vant'
import { useShowPrescription } from '@/hooks'
import { useCancelConsultOrder, useDeleteConsultOrder } from '../service'

const router = useRouter()
const props = defineProps<{
  consultOrder: ConsultOrderDetail
}>()
const emit = defineEmits<{
  (e: 'on-delete', id: string): void
}>()

// 取消订单
const { cancelLoading, cancelConsultOrder } = useCancelConsultOrder()

// 删除订单
const onDeleteSuccess = () => {
  // 通知父组件更新列表
  emit('on-delete', props.consultOrder.id)
}
const { deleteLoading, deleteConsultOrder } = useDeleteConsultOrder(onDeleteSuccess)

// 查看处方
const { showPrescription } = useShowPrescription()

// ---- 已完成订单使用 ----
// 控制更多操作显示
const showPopover = ref(false)
// 操作项
const actions = computed<PopoverAction[]>(() => [
  // 没有处方不可以查看
  { text: '查看处方', disabled: !props.consultOrder.prescriptionId },
  { text: '删除订单' }
])
// 操作项的点击回调
const onSelect = (action: PopoverAction, index: number) => {
  if (index === 0) {
    showPrescription(props.consultOrder.prescriptionId)
  }
  // 删除订单
  if (index === 1) {
    deleteConsultOrder(props.consultOrder)
  }
}
</script>

<template>
  <div class="consult-item">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" alt="doctor avatar" />
      <p>{{ consultOrder.docInfo?.name || '极速问诊（自动分配医生）' }}</p>
      <span
        :class="{
          orange: consultOrder.status === OrderType.ConsultPayWait,
          green: consultOrder.status === OrderType.ConsultChat
        }"
      >
        {{ consultOrder.statusValue }}
      </span>
    </div>
    <div class="body" @click="router.push(`/user/consult/${consultOrder.id}`)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ consultOrder.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ consultOrder.payment.toFixed(2) }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ consultOrder.createTime }}</div>
      </div>
    </div>

    <!-- 订单状态不同 - 底部可操作项也不同 -->
    <!-- 待支付：取消问诊+去支付 -->
    <div class="foot" v-if="consultOrder.status === OrderType.ConsultPayWait">
      <van-button
        :loading="cancelLoading"
        @click="cancelConsultOrder(consultOrder)"
        class="gray"
        plain
        size="small"
        round
      >
        取消问诊
      </van-button>
      <van-button
        :to="`/user/consult/${consultOrder.id}`"
        type="primary"
        plain
        size="small"
        round
      >
        去支付
      </van-button>
    </div>
    <!-- 待接诊：取消问诊+继续沟通 -->
    <div class="foot" v-if="consultOrder.status === OrderType.ConsultWait">
      <van-button
        :loading="cancelLoading"
        @click="cancelConsultOrder(consultOrder)"
        class="gray"
        plain
        size="small"
        round
      >
        取消问诊
      </van-button>
      <van-button
        :to="`/room?orderId=${consultOrder.id}`"
        type="primary"
        plain
        size="small"
        round
      >
        继续沟通
      </van-button>
    </div>
    <!-- 咨询中：查看处方（如果开了）+继续沟通 -->
    <div class="foot" v-if="consultOrder.status === OrderType.ConsultChat">
      <van-button
        v-if="consultOrder.prescriptionId"
        @click="showPrescription(consultOrder.prescriptionId)"
        class="gray"
        plain
        size="small"
        round
      >
        查看处方
      </van-button>
      <van-button
        :to="`/room?orderId=${consultOrder.id}`"
        type="primary"
        plain
        size="small"
        round
      >
        继续沟通
      </van-button>
    </div>
    <!-- 已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价 -->
    <div class="foot" v-if="consultOrder.status === OrderType.ConsultComplete">
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
        :to="`/room?orderId=${consultOrder.id}`"
        class="gray"
        plain
        size="small"
        round
      >
        问诊记录
      </van-button>
      <van-button
        v-if="!consultOrder.evaluateId"
        :to="`/room?orderId=${consultOrder.id}`"
        type="primary"
        plain
        size="small"
        round
      >
        去评价
      </van-button>
      <van-button
        v-else
        :to="`/room?orderId=${consultOrder.id}`"
        class="gray"
        plain
        size="small"
        round
      >
        查看评价
      </van-button>
    </div>
    <!-- 已取消：删除订单+咨询其他医生 -->
    <div class="foot" v-if="consultOrder.status === OrderType.ConsultCancel">
      <van-button
        :loading="deleteLoading"
        @click="deleteConsultOrder(consultOrder)"
        class="gray"
        plain
        size="small"
        round
      >
        删除订单
      </van-button>
      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-item {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    .img {
      width: 20px;
      height: 20px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
    > span {
      color: var(--mc-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--mc-primary);
      }
    }
  }
  .body {
    padding: 15px 15px 8px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
      .body-label {
        width: 62px;
        font-size: 13px;
        color: var(--mc-tip);
      }
      .body-value {
        width: 250px;
        &.tip {
          color: var(--mc-tip);
        }
      }
    }
  }
  .foot {
    padding: 15px;
    padding-top: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--mc-text3);
        background-color: var(--mc-bg);
      }
    }
    .more {
      flex: 1;
      color: var(--cp-tag);
      font-size: 13px;
    }
  }
}
</style>
