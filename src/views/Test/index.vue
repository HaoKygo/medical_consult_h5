<template>
  <h1 class="testhead">测试页面</h1>
  <p style="font-size: 18px">paragraph元素</p>
  <van-button type="primary" @click="getUserInfo">获取个人信息</van-button>
  <van-button type="primary" @click="login">登录</van-button>
  <div>
    <svg aria-hidden="true">
      <!-- #icon-文件夹名称-图片名称 -->
      <use href="#icon-src-icons-home-doctor" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { request } from '@/utils/request'
import { useUserStore } from '@/stores'
import type { User } from '@/types/user'

// 测试，请求拦截器，是否携带token，响应拦截器401拦截到登录地址
const getUserInfo = async () => {
  const res = await request.get('/patient/myUser')
  console.log(res)
}

// 测试，响应拦截器，出现非10000的情况，和返回剥离后的数据
const userStore = useUserStore()
const login = async () => {
  const res = await request.post<any, User>('/login/password', {
    mobile: '13230000001',
    password: 'abc12345' //正确密码
    // password: 'abc12345000' //错误密码
  })
  userStore.setUser(res)
  console.log(res)
}
</script>

<style scoped>
.testhead {
  font-size: 24px;
}
</style>
