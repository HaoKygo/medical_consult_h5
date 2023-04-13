<script setup lang="ts">
import type { Address, MedicineOrderPre } from '@/types/medicine'
import { getMedicineOrderPre, getAddressList, createMedicineOrder } from '@/api/medicine'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showFailToast } from 'vant'

const route = useRoute()
// 获取药品预订单信息和地址信息
const medicineOrdrPre = ref<MedicineOrderPre>()
const address = ref<Address>()
onMounted(async () => {
  const preRes = await getMedicineOrderPre({ prescriptionId: route.query.id as string })
  const addressRes = await getAddressList()
  medicineOrdrPre.value = preRes
  // 设置收货地址
  if (addressRes.length) {
    const defaultAddress = addressRes.find((address) => address.isDefault === 1)
    address.value = defaultAddress ? defaultAddress : addressRes[0]
  }
})

/* 生成订单 */
// 是否同意协议
const agree = ref(false)
// 立即支付按钮loading控制
const submitButtonLoading = ref(false)
// 控制支付弹层
const showPaySheet = ref(false)
// 药品订单id
const orderId = ref('')
// 提交支付
const submitPay = async () => {
  if (!agree.value) {
    window.scrollTo(0, document.body.scrollHeight)
    return showFailToast('请同意支付协议')
  }
  if (!address.value?.id) {
    window.scrollTo(0, 0)
    return showFailToast('请选择收货地址')
  }
  if (!medicineOrdrPre.value?.id) {
    return showFailToast('未找到处方')
  }
  // 没有生成药品订单id
  if (!orderId.value) {
    submitButtonLoading.value = true
    try {
      const res = await createMedicineOrder({
        id: medicineOrdrPre.value.id,
        addressId: address.value.id
      })
      orderId.value = res.id
      // 打开支付弹层
      showPaySheet.value = true
    } catch (error) {
      console.log(error)
      showFailToast('生成订单失败')
    } finally {
      submitButtonLoading.value = false
    }
  } else {
    // 已经有订单
    showPaySheet.value = true
  }
}
</script>

<template>
  <div class="order-pay-page" v-if="medicineOrdrPre && address">
    <McNavBar middleTitle="药品支付"></McNavBar>
    <div class="order-address">
      <p class="area">
        <van-icon name="location"></van-icon>
        <span>{{ address.province + address.city + address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>
      <p>
        {{ address.receiver }}
        {{ address.mobile.replace(/^(\d{3})(?:\d{4})(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>
    <div class="order-medicines">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div
        class="medicine van-hairline-top"
        v-for="medicine in medicineOrdrPre.medicines"
        :key="medicine.id"
      >
        <van-image :src="medicine.avatar" fit="contain"></van-image>
        <div class="info">
          <p class="name">
            <span>{{ medicine.name }}</span>
            <span>x{{ medicine.quantity }}</span>
          </p>
          <p class="size">
            <van-tag v-if="medicine.prescriptionFlag === 1">处方药</van-tag>
            <span>{{ medicine.specs }}</span>
          </p>
          <p class="price">¥{{ medicine.amount }}</p>
        </div>
        <div class="desc">{{ medicine.usageDosag }}</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`¥${medicineOrdrPre.payment}`" />
        <van-cell title="运费" :value="`¥${medicineOrdrPre.expressFee}`" />
        <van-cell
          title="优惠券"
          v-if="medicineOrdrPre.couponDeduction"
          :value="`¥-${medicineOrdrPre.couponDeduction}`"
        />
        <van-cell
          title="实付款"
          :value="`￥${medicineOrdrPre.actualPayment}`"
          class="price"
        />
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
        不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox v-model="agree">
        我已同意<a href="javascript:;">支付协议</a>
      </van-checkbox>
    </div>
    <van-submit-bar
      @click="submitPay"
      :loading="submitButtonLoading"
      :price="medicineOrdrPre.actualPayment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
    <McPaySheet
      v-model:show="showPaySheet"
      :orderId="orderId"
      :actualPayment="medicineOrdrPre.actualPayment"
      payCallback="http://localhost:5173/medicine/pay/result"
    ></McPaySheet>
  </div>
  <div class="order-pay-page" v-else>
    <McNavBar middleTitle="药品支付"></McNavBar>
    <van-skeleton title :row="4" style="margin-top: 30px"></van-skeleton>
    <van-skeleton title :row="4" style="margin-top: 30px"></van-skeleton>
  </div>
</template>

<style lang="scss" scoped>
.order-pay-page {
  padding: 44px 0 65px;
  :deep(.van-nav-bar) {
    background-color: var(--mc-primary);
    .van-nav-bar__arrow,
    .van-nav-bar__title {
      color: #fff;
    }
  }
  :deep(.van-cell) {
    .van-cell__title,
    .van-cell__value {
      font-size: 16px;
    }
    &.price {
      .van-cell__value {
        font-size: 18px;
        color: var(--mc-price);
      }
    }
  }
  :deep(.van-submit-bar) {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    .van-button {
      width: 200px;
    }
  }
  .order-address {
    padding: 15px;
    padding-bottom: 0;
    background-color: #fff;
    font-size: 13px;
    .area {
      color: var(--mc-tag);
      margin-bottom: 5px;
      .van-icon-location {
        font-size: 14px;
        color: #ff7702;
      }
    }
    .detail {
      font-size: 17px;
      margin-bottom: 5px;
    }
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--mc-bg);
      margin: 0 -15px;
      margin-top: 15px;
    }
  }
  .order-medicines {
    background-color: #fff;
    padding: 0 15px;
    .head {
      display: flex;
      align-items: center;
      height: 54px;
      > h3 {
        font-size: 16px;
        font-weight: 400;
      }
      > small {
        font-size: 13px;
        color: var(--mc-tag);
        margin-left: 10px;
      }
    }
    .medicine {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      .van-image {
        width: 80px;
        height: 70px;
        border-radius: 2px;
        overflow: hidden;
      }
      .info {
        padding-left: 15px;
        width: 250px;
        .name {
          display: flex;
          font-size: 13px;
          margin-bottom: 5px;
          > span:first-child {
            width: 200px;
          }
          > span:last-child {
            width: 50px;
            text-align: right;
          }
        }
        .size {
          margin-bottom: 5px;
          .van-tag {
            background-color: var(--mc-primary);
            vertical-align: middle;
          }
          span:not(.van-tag) {
            margin-left: 10px;
            color: var(--mc-tag);
            vertical-align: middle;
          }
        }
        .price {
          font-size: 16px;
          color: #eb5757;
        }
      }
      .desc {
        width: 100%;
        background-color: var(--mc-bg);
        border-radius: 4px;
        margin-top: 10px;
        padding: 4px 10px;
        color: var(--mc-tip);
      }
    }
  }
  .order-tip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 15px;
    margin-top: 10px;
    .tip {
      font-size: 12px;
      color: var(--mc-tag);
      width: 100%;
      &::before {
        content: '*';
        color: var(--mc-price);
        font-size: 14px;
      }
      margin-bottom: 30px;
    }
    .van-checkbox {
      a {
        color: var(--mc-primary);
      }
    }
  }
}
</style>
