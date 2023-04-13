<script setup lang="ts">
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
import { getConsultOrderPre, createConsultOrder } from '@/api/consult'
import { getPatientDetail } from '@/api/user'
import { useConsultStore } from '@/stores'
import { ref, onMounted } from 'vue'
import { showConfirmDialog, showDialog, showFailToast } from 'vant'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

const consultStore = useConsultStore()
const router = useRouter()

// 预查询订单信息
const payInfo = ref<ConsultOrderPreData>()
const loadPayInfo = async () => {
  try {
    const res = await getConsultOrderPre({
      type: consultStore.consult.type,
      illnessType: consultStore.consult.illnessType
    })
    payInfo.value = res
    // 设置优惠券信息
    if (payInfo.value.couponId) {
      consultStore.setCoupon(payInfo.value.couponId)
    }
  } catch (error) {
    showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如果未支付可以去记录继续支付'
    })
    router.push('/home')
  }
}

// 查询患者信息
const patient = ref<Patient>()
const loadPatient = async () => {
  if (!consultStore.consult.patientId) {
    return
  }
  const res = await getPatientDetail(consultStore.consult.patientId)
  patient.value = res
}

// 组件挂载完后加载数据
onMounted(() => {
  loadPayInfo()
  loadPatient()
})

// 是否同意协议
const agreement = ref(false)
// 是否显示支付弹层
const showPaySheet = ref(false)
// 订单信息id
const orderId = ref('')
// 请求支付
const paySubmit = async () => {
  if (!agreement.value) {
    return showFailToast('请勾选我已同意支付协议')
  }
  // 弹出支付面板前创建订单
  try {
    const res = await createConsultOrder(consultStore.consult)
    orderId.value = res.id
    consultStore.clearConsult()
    // 弹出支付面板
    showPaySheet.value = true
  } catch (error) {
    console.log(error)
  }
}

// 如果生成了订单，路由不可回退
onBeforeRouteLeave(() => {
  if (orderId.value) {
    return false
  }
})
const onPaySheetClose = async () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--mc-primary)'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      // 清空订单id才能跳转页面
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
</script>

<template>
  <div class="consult-pay-page" v-if="payInfo">
    <McNavBar middleTitle="支付"></McNavBar>
    <!-- 支付信息 -->
    <div class="pay-info">
      <p class="title" v-if="payInfo.payment">
        {{ `图文问诊 ${payInfo.payment} 元` }}
      </p>
      <img src="@/assets/avatar-doctor.svg" alt="doctor avatar" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell
        v-if="payInfo.couponDeduction"
        title="优惠券"
        :value="`-¥${payInfo.couponDeduction}`"
      ></van-cell>
      <van-cell
        v-if="payInfo.pointDeduction"
        title="积分抵扣"
        :value="`-¥${payInfo.pointDeduction}`"
      ></van-cell>
      <van-cell
        v-if="payInfo.actualPayment"
        title="实付款"
        :value="`¥${payInfo.actualPayment}`"
        class="pay-price"
      ></van-cell>
    </van-cell-group>
    <div class="pay-space"></div>
    <!-- 患者信息 -->
    <van-cell-group>
      <van-cell
        v-if="patient"
        title="患者信息"
        :value="`${patient.name} | ${patient.genderValue} | ${patient.age}岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="consultStore.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agreement">
        我已同意 <span class="text">支付协议</span>
      </van-checkbox>
    </div>
    <!-- 支付按钮bar -->
    <van-submit-bar
      v-if="payInfo.actualPayment"
      @click="paySubmit"
      :price="payInfo.actualPayment * 100"
      textAlign="left"
      buttonType="primary"
      buttonText="立刻支付"
    ></van-submit-bar>
    <!-- 支付弹层 -->
    <McPaySheet
      v-model:show="showPaySheet"
      :orderId="orderId"
      :onClose="onPaySheetClose"
      :actual-payment="payInfo.actualPayment"
    ></McPaySheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 44px 0 50px;
  .pay-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px;
    .title {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--mc-tag);
        &:first-child {
          font-size: 16px;
          color: var(--mc-text2);
        }
      }
    }
  }
  .pay-price {
    ::v-deep() {
      .van-cell__title {
        font-size: 16px;
      }
      .van-cell__value {
        font-size: 16px;
        color: var(--mc-price);
      }
    }
  }
  .pay-space {
    height: 12px;
    background-color: var(--mc-bg);
  }
  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: var(--mc-primary);
    }
  }
  ::v-deep() {
    .van-submit-bar__button {
      font-weight: 400;
      width: 160px;
    }
  }
}
</style>
