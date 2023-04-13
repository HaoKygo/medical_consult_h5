<script setup lang="ts">
import type { MedicineOrderDetail } from '@/types/medicine'
import { getMedicineOrderDetail } from '@/api/medicine'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// 获取药品订单详情
const medicineOrderDetail = ref<MedicineOrderDetail>()
onMounted(async () => {
  const res = await getMedicineOrderDetail(route.query.orderId as string)
  medicineOrderDetail.value = res
})
</script>

<template>
  <div class="order-pay-result-page">
    <McNavBar middleTitle="药品支付结果"></McNavBar>
    <div class="result" v-if="medicineOrderDetail">
      <van-icon name="checked"></van-icon>
      <p class="price">{{ `¥ ${medicineOrderDetail?.actualPayment}` }}</p>
      <p class="status">支付成功</p>
      <p class="tip">订单支付成功，已通知药房尽快发出， 请耐心等待~</p>
      <div class="btn">
        <van-button type="primary" :to="`/medicine/${medicineOrderDetail?.id}`">
          查看订单
        </van-button>
        <van-button :to="`/room?orderId=${medicineOrderDetail?.roomId}`">
          返回诊室
        </van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-pay-result-page {
  padding-top: 44px;
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-icon {
      font-size: 75px;
      color: var(--mc-primary);
      margin-top: 60px;
    }
    .price {
      font-size: 22px;
      margin-top: 10px;
    }
    .status {
      color: var(--mc-text3);
    }
    .tip {
      color: var(--mc-tip);
      width: 240px;
      text-align: center;
      margin-top: 20px;
    }
    .btn {
      margin-top: 60px;
      .van-button--primary {
        margin-right: 20px;
      }
    }
    &.error {
      .van-icon {
        color: var(--mc-price);
      }
    }
  }
}
</style>
