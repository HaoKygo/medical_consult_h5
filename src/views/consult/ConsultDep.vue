<script setup lang="ts">
import type { FirstDep } from '@/types/consult'
import { ref, onMounted, computed } from 'vue'
import { getAllDep } from '@/api/consult'
import { useConsultStore } from '@/stores'

const consultStore = useConsultStore()

// 当前一级科室
const active = ref(0)

// 获取所有科室
const allDep = ref<FirstDep[]>([])
const subDep = computed(() => allDep.value[active.value]?.child)
const loadAllDep = async () => {
  const res = await getAllDep()
  allDep.value = res
}
onMounted(() => {
  loadAllDep()
})
</script>

<template>
  <!-- 极速问诊 - 选择科室页面 -->
  <div class="consult-dep-page">
    <McNavBar middleTitle="选择科室"></McNavBar>
    <div class="wrapper">
      <!-- 一级科室 -->
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="first in allDep" :key="first.id" :title="first.name" />
      </van-sidebar>
      <!-- 二级科室 -->
      <div class="sub-dep">
        <router-link
          v-for="sub in subDep"
          :key="sub.id + 'subdep'"
          @click="consultStore.setDep(sub.id)"
          class="dep"
          to="/consult/illness"
        >
          {{ sub.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-dep-page {
  padding-top: 44px;
  .wrapper {
    height: calc(100vh - 44px);
    overflow: hidden;
    display: flex;
    .van-sidebar {
      width: 114px;
      &-item {
        padding: 15px;
        color: var(--mc-tag);
        &--select {
          color: var(--mc-main);
          font-weight: 400;
          &::before {
            display: none;
          }
        }
      }
    }
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > .dep {
        display: block;
        padding: 15px 30px;
        color: var(--mc-dark);
      }
    }
  }
}
</style>
