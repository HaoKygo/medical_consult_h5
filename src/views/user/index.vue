<script setup lang="ts">
import { getUserInfo } from '@/api/user'
import type { UserInfo } from '@/types/user'
import { onMounted, ref } from 'vue'
import { showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

// 获取用户信息
const userInfo = ref<UserInfo>()
const loadUserInfo = async () => {
  const res = await getUserInfo()
  userInfo.value = res
}
onMounted(() => {
  loadUserInfo()
})

// 快捷工具列表
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]

// 退出登录
const userStore = useUserStore()
const router = useRouter()
const logout = () => {
  showConfirmDialog({
    title: '提示',
    message: '亲，确定退出问诊吗？'
  })
    .then(() => {
      userStore.delUser()
      router.push('/login')
    })
    .catch(() => {})
}
</script>

<template>
  <div class="user-page" v-if="userInfo">
    <!-- 头部 -->
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="userInfo.avatar"></van-image>
        <div class="name">
          <p>{{ userInfo.account }}</p>
          <p><van-icon name="edit"></van-icon></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ userInfo.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <!-- 药品订单 -->
    <div class="user-page-order" v-if="userInfo.orderInfo">
      <div class="head">
        <h3>药品订单</h3>
        <RouterLink to="/order">全部订单 <van-icon name="arrow"></van-icon></RouterLink>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.paidNumber || ''">
            <McIcon name="user-paid"></McIcon>
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.shippedNumber || ''">
            <McIcon name="user-shipped"></McIcon>
          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.receivedNumber || ''">
            <McIcon name="user-received"></McIcon>
          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo.finishedNumber || ''">
            <McIcon name="user-finished"></McIcon>
          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <!-- 快捷工具 -->
    <div class="user-page-tool">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(tool, i) in tools"
        :key="i"
        :title="tool.label"
        is-link
        :border="false"
        :to="tool.path"
      >
        <template #icon><McIcon :name="`user-tool-0${i + 1}`"></McIcon></template>
      </van-cell>
    </div>
    <!-- 退出登录 -->
    <a @click="logout" class="logout" href="javascript:;">退出登录</a>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--mc-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;
      .van-image {
        width: 70px;
        height: 70px;
      }
      .name {
        padding-left: 12px;
        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--mc-primary);
            font-size: 16px;
          }
        }
      }
    }
    .van-row {
      margin: 0 -15px;
      padding-top: 15px;
      p {
        text-align: center;
        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }
        &:last-child {
          color: var(--mc-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  // 药品订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 48px;
      padding: 0 15px;
      a {
        color: var(--mc-tip);
      }
    }
    .van-col {
      text-align: center;
      .mc-icon {
        font-size: 28px;
      }
      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
  // 快捷工具
  &-tool {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .mc-icon {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  // 退出登录
  .logout {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    color: var(--mc-price);
  }
}
</style>
