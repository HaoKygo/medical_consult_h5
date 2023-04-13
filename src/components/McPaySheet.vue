<script setup lang="ts">
import { showLoadingToast, showFailToast } from 'vant'
import { ref } from 'vue'
import { getConsultOrderPayUrl } from '@/api/consult'

const { orderId, show, payCallback } = defineProps<{
  show: boolean
  orderId: string
  actualPayment?: number
  onClose?: () => void
  // 支付成功返回地址
  payCallback?: string
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

// 支付方式：0微信支付 1支付宝
const payMethod = ref<0 | 1>()

// 支付
const pay = async () => {
  // 注意支付方式0微信，不能做!判断
  if (payMethod.value === undefined) {
    return showFailToast('请选择支付方式')
  }
  showLoadingToast('跳转支付...')
  const res = await getConsultOrderPayUrl({
    orderId: orderId,
    paymentMethod: payMethod.value,
    payCallback: payCallback || 'http://127.0.0.1:5173/room'
  })
  window.location.href = res.payUrl
}
</script>

<template>
  <!-- 支付弹层 -->
  <van-action-sheet
    :show="show"
    @update:show="emit('update:show', $event)"
    :closeable="false"
    :closeOnPopstate="false"
    :beforeClose="onClose"
    title="请选择支付方式"
  >
    <div class="pay-type">
      <p class="pay-amount" v-if="actualPayment">
        {{ `¥${actualPayment.toFixed(2)}` }}
      </p>
      <van-cell-group>
        <van-cell title="微信支付" @click="payMethod = 0">
          <template #icon><McIcon name="consult-wechat"></McIcon></template>
          <template #extra>
            <van-checkbox :checked="payMethod === 0"></van-checkbox>
          </template>
        </van-cell>
        <van-cell title="支付宝" @click="payMethod = 1">
          <template #icon><McIcon name="consult-alipay"></McIcon></template>
          <template #extra>
            <van-checkbox :checked="payMethod === 1"></van-checkbox>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="pay-btn">
        <van-button @click="pay" type="primary" round block>立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.pay-type {
  .pay-amount {
    padding: 20px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
  .pay-btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .mc-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    :deep(.van-cell__title) {
      font-size: 16px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
