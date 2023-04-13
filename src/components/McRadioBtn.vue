<script setup lang="ts">
import type { McRadiobtnOptionValue, McRadiobtnOptions } from '@/types/components'

defineProps<{
  // 选项列表
  options: McRadiobtnOptions
  modelValue?: McRadiobtnOptionValue
}>()

const emit = defineEmits<{
  // 创建更新modelValue的emit事件
  (e: 'update:modelValue', data: McRadiobtnOptionValue): void
}>()

const toggleBtn = (value: McRadiobtnOptionValue) => {
  // 触发自定义事件并传数据给父组件
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="mc-radio-btn">
    <!-- 单选列表 -->
    <a
      v-for="option in options"
      :key="option.value"
      :class="{ active: modelValue === option.value }"
      @click="toggleBtn(option.value)"
      href="javascript:;"
    >
      {{ option.label }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
.mc-radio-btn {
  display: flex;
  flex-wrap: wrap;
  a {
    box-sizing: border-box;
    height: 32px;
    min-width: 30px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--mc-bg);
    background-color: var(--mc-bg);
    margin-right: 10px;
    margin-bottom: 10px;
    color: var(--mc-text2);
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--mc-primary);
      background-color: var(--mc-plain);
    }
  }
}
</style>
