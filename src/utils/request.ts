import axios from 'axios'
import { useUserStore } from '@/stores'
import { showFailToast } from 'vant'
import router from '@/router'

// 创建新axios实例和基础配置
const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器，携带token
// 发请求之前执行
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${userStore.user?.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器，剥离无效数据，401拦截
// 发请求之后执行
request.interceptors.response.use(
  (res) => {
    // 后台约定，响应成功，但是code不是10000，则表示业务逻辑失败
    if (res.data?.code !== 10000) {
      showFailToast(res.data.message)
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    return res.data?.data
  },
  (err) => {
    if (err.response.status === 401) {
      // 删除用户
      const userStore = useUserStore()
      userStore.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      // router.currentRoute.value.fullPath 当前访问页面的path地址
      // 为了让用户重新登录后，返回登录前的页面
      // fullPaht表示完整path地址，会携带地址参数，而path则不会携带地址参数
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

export { baseURL, request }
