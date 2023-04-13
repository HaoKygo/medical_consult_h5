<script setup lang="ts">
// 提供name属性
defineProps<{
  name: string
}>()
</script>

<template>
  <svg aria-hidden="true" class="mc-icon">
    <!-- #icon-文件夹名称-图片名称 -->
    <use :href="`#icon-src-assets-icons-${name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.mc-icon {
  width: 1em;
  height: 1em;
}
</style>
