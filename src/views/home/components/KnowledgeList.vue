<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import type { KnowledgeType, KnowledgeList, KnowledgeParams } from '@/types/home'
import { getKnowledgeListWithPage } from '@/api/home'
import { ref } from 'vue'

const props = defineProps<{
  type: KnowledgeType
}>()

// van-list 加载和结束控制
const loading = ref(false)
const finished = ref(false)

// 获取文章列表
const knowledgeList = ref<KnowledgeList>([])
const knowledgeParams = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})

const onLoad = async () => {
  // 加载更多
  const res = await getKnowledgeListWithPage(knowledgeParams.value)
  knowledgeList.value.push(...res.rows)
  // 如果当前页数大于等于总页数，加载完毕
  if (knowledgeParams.value.current >= res.pageTotal) {
    finished.value = true
  } else {
    knowledgeParams.value.current++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <KnowledgeCard
        v-for="knowledge in knowledgeList"
        :key="knowledge.id"
        :knowledge="knowledge"
      ></KnowledgeCard>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
