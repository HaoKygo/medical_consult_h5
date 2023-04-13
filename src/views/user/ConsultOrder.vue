<script setup lang="ts">
import { ConsultType } from '@/enums'
import ConsultList from './components/ConsultList.vue'
</script>

<template>
  <div class="consult-page">
    <McNavBar middleTitle="问诊记录"></McNavBar>
    <van-tabs sticky>
      <van-tab title="极速问诊">
        <ConsultList :type="ConsultType.Fast"></ConsultList>
      </van-tab>
      <van-tab title="找医生">
        <ConsultList :type="ConsultType.Doctor"></ConsultList>
      </van-tab>
      <van-tab title="开药问诊">
        <ConsultList :type="ConsultType.Medication"></ConsultList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  padding-top: 44px;
  background-color: var(--mc-bg);
  min-height: calc(100vh - 44px);
}
</style>
