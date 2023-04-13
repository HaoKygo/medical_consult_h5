<script setup lang="ts"></script>

<template>
  <div class="layout-page">
    <!-- 顶部：显示子路由 -->
    <RouterView />

    <!-- 底部：使用vant组件库中tabbar的路由模式 -->
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <div class="tab-title">首页</div>
        <!-- 自定义插槽 -->
        <template #icon="{ active }">
          <McIcon :name="`home-index-${active ? 'active' : 'default'}`"></McIcon>
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/article">
        <div class="tab-title">健康百科</div>
        <template #icon="{ active }">
          <McIcon :name="`home-article-${active ? 'active' : 'default'}`"></McIcon>
        </template>
      </van-tabbar-item> -->
      <!-- <van-tabbar-item to="/notify">
        <div class="tab-title">消息中心</div>
        <template #icon="{ active }">
          <McIcon :name="`home-notice-${active ? 'active' : 'default'}`"></McIcon>
        </template>
      </van-tabbar-item> -->
      <van-tabbar-item to="/user">
        <div class="tab-title">我的</div>
        <template #icon="{ active }">
          <McIcon :name="`home-mine-${active ? 'active' : 'default'}`"></McIcon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-tabbar-item {
    &__icon {
      font-size: 21px;
    }
    &__text {
      font-size: 11px;
    }
  }
}
// 非穿透写法
// .tab-title {
//   font-size: 10px;
// }
// .mc-icon {
//   font-size: 18px;
// }
</style>
