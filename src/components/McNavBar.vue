<script setup lang="ts">
// 封装需求：支持 title rightText 属性，支持 click-right 事件

import { useRouter } from 'vue-router'

// click-left函数内支持返回上一页或默认首页
// vue2: this.$router
const router = useRouter()
const handleClickLeft = () => {
  // 先判断是否有back函数
  if (props.back) {
    return props.back()
  }
  // 返回上次访问页面
  // 使用router.replace跳转，不能返回
  if (history.state.back) {
    // 存在回调地址就返回
    router.back()
  } else {
    // 不存在则返回首页
    router.push('/')
  }
}

// 使用组件时候才能确定的功能：标题，右侧文字，点击左侧箭头行为（props传入）
const props = defineProps<{
  // 顶栏中间标题
  middleTitle?: string
  // 顶栏右边文字
  rightText?: string
  // 点击左侧箭头返回函数
  back?: () => void
}>()

const emit = defineEmits<{
  (e: 'click-right'): void
}>()
</script>

<template>
  <van-nav-bar
    @click-left="handleClickLeft"
    @click-right="emit('click-right')"
    :title="middleTitle"
    :right-text="rightText"
    left-arrow
    fixed
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
// 深度作用其他组件样式/样式穿透
// vue2: /deep/
// vue3: ::v-deep()
// 什么情况下需要使用深度作用选择符
// 1、元素class有data-v属性，直接用类名控制样式
// 2、元素class没有data-v属性，需要使用深度作用选择符
::v-deep() {
  .van-nav-bar {
    &__content {
      height: 44px;
    }
    &__arrow {
      font-size: 18px;
      color: var(--mc-text1);
    }
  }
}
</style>
