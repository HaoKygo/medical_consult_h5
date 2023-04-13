<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useMedicineOrder } from '@/hooks'

const router = useRouter()
const route = useRoute()
const { medicineOrder } = useMedicineOrder(route.params.id as string)
</script>

<template>
  <div class="order-detail-page" v-if="medicineOrder">
    <McNavBar middleTitle="药品订单详情"></McNavBar>
    <template v-if="medicineOrder">
      <div class="order-head">
        <div class="card" @click="router.push(`/medicine/express/${medicineOrder?.id}`)">
          <div class="logistics">
            <p>{{ medicineOrder.expressInfo?.content || '已通知取快递' }}</p>
            <p>{{ medicineOrder.expressInfo?.time || '--' }}</p>
          </div>
          <van-icon name="arrow"></van-icon>
        </div>
      </div>
      <!-- 药品列表 -->
      <div class="order-medicines">
        <div class="head">
          <h3>优医药房</h3>
          <small>优医质保 假一赔十</small>
        </div>
        <div
          class="medicine van-hairline--top"
          v-for="medicine in medicineOrder.medicines"
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
            <p class="price">￥{{ medicine.amount }}</p>
          </div>
          <div class="desc" v-if="medicine.usageDosag">{{ medicine.usageDosag }}</div>
        </div>
      </div>
      <div class="order-detail">
        <van-cell-group>
          <van-cell title="药品金额" :value="`￥${medicineOrder.payment}`" />
          <van-cell
            title="运费"
            v-if="medicineOrder.expressFee"
            :value="`￥${medicineOrder.expressFee}`"
          />
          <van-cell
            title="优惠券"
            v-if="medicineOrder.couponDeduction"
            :value="`-￥${medicineOrder.couponDeduction}`"
          />
          <van-cell
            title="实付款"
            :value="`￥${medicineOrder.actualPayment}`"
            class="price"
          />
          <van-cell title="订单编号" :value="medicineOrder.orderNo" />
          <van-cell title="创建时间" :value="medicineOrder.createTime" />
          <van-cell title="支付时间" :value="medicineOrder.payTime" />
          <van-cell
            title="支付方式"
            :value="medicineOrder.paymentMethod === 0 ? '微信' : '支付宝'"
          />
        </van-cell-group>
      </div>
      <van-action-bar>
        <van-action-bar-button type="primary" text="确认收货"></van-action-bar-button>
      </van-action-bar>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.order-detail-page {
  padding-top: 44px;
  padding-bottom: 65px;
  .order-head {
    position: relative;
    padding: 15px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 80px;
      background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }
    .card {
      height: 74px;
      background-color: #fff;
      border-radius: 8px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
      .logistics {
        flex: 1;
        p {
          &:first-child {
            color: var(--mc-primary);
          }
          &:last-child {
            font-size: 13px;
            color: var(--mc-tag);
            margin-top: 5px;
          }
        }
      }
      .van-icon {
        color: var(--mc-tip);
      }
    }
  }
  .order-medicines {
    background-color: #fff;
    padding: 0 15px;
    .head {
      display: flex;
      height: 54px;
      align-items: center;
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
          font-size: 15px;
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
  :deep(.van-cell) {
    .van-cell__title {
      font-size: 16px;
    }
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
  .van-action-bar {
    padding: 0 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    .price {
      padding: 0 10px;
      > span {
        font-size: 18px;
        color: var(--mc-price);
      }
    }
  }
}
</style>
