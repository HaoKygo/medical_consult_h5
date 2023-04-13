<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useConsultStore } from '@/stores'

const router = useRouter()
const consultStore = useConsultStore()
</script>

<template>
  <div class="consult-fast-page">
    <!-- 极速问诊开始页 -->
    <McNavBar
      middleTitle="极速问诊"
      rightText="问诊记录"
      @click-right="router.push('/user/consult')"
    ></McNavBar>
    <!-- 极速问诊logo -->
    <div class="fast-logo">
      <img class="img" src="@/assets/consult-fast.png" alt="极速问诊logo" />
      <p class="text"><span>20s</span> 快速匹配专业医生</p>
    </div>
    <!-- 选择问诊类型 -->
    <div class="fast-type">
      <RouterLink to="/consult/dep" @click="consultStore.setIllnessType(1)" class="type">
        <McIcon class="pic" name="consult-doctor"></McIcon>
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治医生以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </RouterLink>
      <RouterLink to="/consult/dep" @click="consultStore.setIllnessType(0)" class="type">
        <McIcon class="pic" name="consult-message"></McIcon>
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-fast-page {
  padding-top: 44px;
  .fast-logo {
    padding: 30px 0;
    text-align: center;
    .img {
      width: 240px;
    }
    .text {
      font-size: 16px;
      margin-top: 10px;
      > span {
        color: var(--mc-primary);
      }
    }
  }
  .fast-type {
    padding: 15px;
    .type {
      display: flex;
      align-items: center;
      padding: 16px;
      margin-bottom: 16px;
      border: 0.5px solid var(--mc-line);
      border-radius: 4px;
      .pic {
        width: 40px;
        height: 40px;
      }
      .info {
        margin-left: 12px;
        flex: 1;
        > p:first-child {
          font-size: 16px;
          color: var(--mc-text1);
          margin-bottom: 4px;
        }
        > p:last-child {
          font-size: 13px;
          color: var(--mc-tag);
        }
      }
      .van-icon {
        color: var(--mc-tip);
      }
    }
  }
}
</style>
