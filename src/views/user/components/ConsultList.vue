<script setup lang="ts">
import type { ConsultType } from '@/enums'
import type { ConsultOrderDetail, ConsultOrderListParams } from '@/types/consult'
import { getConsultOrderList } from '@/api/consult'
import { ref } from 'vue'
import ConsultItem from './ConsultItem.vue'

const props = defineProps<{
  type: ConsultType
}>()
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})

// van-list 是否处于加载状态
const loading = ref(false)
// van-list 是否已加载完成
const finished = ref(false)
// 问诊订单列表
const consultOrderList = ref<ConsultOrderDetail[]>([])
// 加载订单列表数据
const onLoad = async () => {
  const res = await getConsultOrderList(params.value)
  consultOrderList.value.push(...res.rows)
  if (params.value.current < res.pageTotal) {
    params.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}

// 监听删除订单函数
const onDelete = (id: string) => {
  consultOrderList.value = consultOrderList.value.filter((order) => order.id !== id)
}
</script>

<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finishedText="没有更多了"
      @load="onLoad"
    >
      <template v-for="consultOrder in consultOrderList" :key="consultOrder.id">
        <ConsultItem
          v-if="consultOrder"
          :consultOrder="consultOrder"
          @on-delete="onDelete"
        ></ConsultItem>
      </template>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
