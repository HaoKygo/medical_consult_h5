<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { showFailToast, showSuccessToast, type FormInstance } from 'vant'
// 手机号和密码校验规则
import { mobileRules, passwordRules, verificaitonCodeRules } from '@/utils/formRules'
import {
  loginByPassword,
  loginByVerificationCode,
  sendMobileVerificationCode
} from '@/api/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

// 是否是密码登录
const isPasswordLogin = ref(true)

// 手机号码
const mobile = ref('')
// 账号密码
const password = ref('')
// 手机短信验证码
const verificaitonCode = ref('')
// 控制密码是否显示
const isShowPassword = ref(false)
// 是否同意用户协议和隐私条款
const agree = ref(false)

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
// 表单提交
const login = async () => {
  if (!agree.value) {
    return showFailToast('请勾选我已同意')
  }
  // 表单验证通过，进行登录
  const res = isPasswordLogin.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByVerificationCode(mobile.value, verificaitonCode.value)
  userStore.setUser(res)
  // 如果有回调地址就进行回跳，没有就跳转到个人中心
  router.push((route.query.returnUrl as string) || '/user')
  showSuccessToast('登录成功')
}

// 发送验证码
const form = ref<FormInstance>()
const countDown = ref(0) //倒计时
let timeId: number
const sendVerificationCode = async () => {
  // 倒计时大于0时不能再次发送验证码，60s内不能重复发送验证码
  if (countDown.value > 0) {
    return
  }
  // 校验手机表单项，验证不通过报错，则阻止继续发送验证码
  await form.value?.validate('mobile')
  await sendMobileVerificationCode(mobile.value, 'login')
  showSuccessToast('发送成功')
  // 开始倒计时
  window.clearInterval(timeId)
  countDown.value = 60
  timeId = window.setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      window.clearInterval(timeId)
    }
  }, 1000)
}
// 组件卸载时，清除定时器
onUnmounted(() => {
  window.clearInterval(timeId)
})

const clickRight = () => {
  console.log('点击了注册')
}
</script>

<template>
  <McNavBar rightText="注册" @click-right="clickRight"></McNavBar>

  <div class="login">
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPasswordLogin ? '密码登录' : '手机验证码登录' }}</h3>
      <a href="javascript:;" @click="isPasswordLogin = !isPasswordLogin">
        <span>{{ isPasswordLogin ? '手机验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单 -->
    <van-form @submit="login" autocomplete="false">
      <!-- 手机号码输入 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号码"
        type="tel"
        :rules="mobileRules"
      ></van-field>
      <!-- 密码输入 -->
      <van-field
        v-if="isPasswordLogin"
        v-model="password"
        placeholder="请输入密码"
        :type="`${isShowPassword ? 'text' : 'password'}`"
        :rules="passwordRules"
      >
        <template #button>
          <McIcon
            @click="isShowPassword = !isShowPassword"
            :name="`login-eye-${isShowPassword ? 'on' : 'off'}`"
          ></McIcon>
        </template>
      </van-field>
      <!-- 短信验证码输入 -->
      <van-field
        v-else
        v-model="verificaitonCode"
        placeholder="请输入短信验证码"
        :rules="verificaitonCodeRules"
      >
        <template #button>
          <span @click="sendVerificationCode" class="get-verification-code">
            {{ countDown > 0 ? `${countDown}s` : '获取验证码' }}
          </span>
        </template>
      </van-field>
      <!-- 用户协议和隐私条款选择 -->
      <div class="mc-agree">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <!-- 登录按钮 -->
      <div class="mc-login">
        <van-button block round type="primary" native-type="submit">登录</van-button>
      </div>
      <!-- 忘记密码 -->
      <div class="mc-forget">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  padding-top: 44px;
  // 头部样式
  &-head {
    padding: 25px 15px 45px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 16px;
    }
  }
  // form样式
  .van-form {
    .get-verification-code {
      color: var(--mc-primary);
    }
    .mc-agree {
      padding: 15px 0 21px 16px;
      a {
        padding: 0 5px;
        font-size: 14px;
        color: var(--mc-primary);
      }
    }
    .mc-login {
      padding: 0 16px;
      font-size: 16px;
    }
    .mc-forget {
      display: flex;
      justify-content: center;
      padding: 15px 16px;
      a {
        color: var(--mc-text3);
      }
    }
  }
}
</style>
