<script setup lang="ts">
import { OrderType } from '@/enums'

defineProps<{
  status?: OrderType
  countdown?: number
}>()
</script>

<template>
  <div class="room-status" v-if="status">
    <!-- 问诊状态 -->
    <!-- 未接诊 -->
    <div class="wait" v-if="status === OrderType.ConsultWait">
      已通知医生尽快接诊，24小时内医生未回复将自动退款
    </div>
    <!-- 接诊：咨询中 -->
    <div class="chat" v-if="status === OrderType.ConsultChat">
      <span>咨询中</span>
      <span v-if="countdown">
        剩余时间：<van-count-down :time="countdown * 1000"></van-count-down>
      </span>
    </div>
    <!-- 问诊结束 -->
    <div
      class="end"
      v-if="status === OrderType.ConsultComplete || status === OrderType.ConsultCancel"
    >
      <van-icon name="passed"></van-icon> 已结束
    </div>
  </div>
</template>

<style lang="scss" scoped>
.room-status {
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  height: 44px;
  background-color: #fff;
  font-size: 13px;
  z-index: 1;
  .wait {
    padding: 0 15px;
    background-color: (--mc-plain);
    line-height: 44px;
    height: 100%;
    text-align: center;
    color: var(--mc-primary);
  }
  .chat {
    height: 100%;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      &:first-child {
        color: var(--mc-primary);
      }
      &:last-child {
        color: var(--mc-text2);
        width: 120px;
      }
    }
  }
  .end {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    font-weight: 500;
    .van-icon {
      margin-right: 4px;
      position: relative;
      top: 1px;
      font-size: 14px;
    }
  }
}
</style>
