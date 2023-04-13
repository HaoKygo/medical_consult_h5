<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DoctorCard from './DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import type { DoctorList } from '@/types/home'
import { getDoctorListWithPage } from '@/api/home'

// 获取window的innerWidth
const { width: windowInnerWidth } = useWindowSize()
// 获取关注医生
const doctorList = ref<DoctorList>([])
const loadDoctorList = async () => {
  const res = await getDoctorListWithPage({ current: 1, pageSize: 5 })
  doctorList.value = res.rows
}
onMounted(() => {
  loadDoctorList()
})
</script>

<template>
  <div class="recommend-doctor">
    <div class="head">
      <p>推荐关注</p>
      <a href="javascript:;">查看更多<i class="van-icon van-icon-arrow"></i></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe
        :width="(150 / 375) * windowInnerWidth"
        :autoplay="3000"
        :loop="false"
        :show-indicators="false"
      >
        <van-swipe-item v-for="doctor in doctorList" :key="doctor.id">
          <DoctorCard :doctor="doctor"></DoctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommend-doctor {
  background-color: var(--mc-bg);
  padding-bottom: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--mc-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
