// vue2: 是通过new Router创建路由实例
// vue3: 是通过createRouter
// createRouter 创建路由实例，===> new VueRouter()
// history 是路由模式，hash模式，history模式
// vue2: 通过mode: 'history' | 'hash'指定路由模式
// createWebHistory() 是开启history模块   http://xxx/user
// createWebHashHistory() 是开启hash模式    http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path
// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * 页面访问拦截：使用前置路由守卫拦截
 * vue2：to 去哪 form 从哪来 next:Function 放行
 * 说明：vue2需要通过next函数放行
 * vue3：to 去哪 form 从哪来
 */
router.beforeEach((to) => {
  // 给页面标签动态添加title
  document.title = `在线问诊${to.meta.title ? '-' + to.meta.title : ''}`

  // 根据是否有token，决定用户是否可以访问to页面
  // 有token或前往登录等公共页面：正常访问
  // 没有token：跳回登录页 return 'path地址‘
  const userStore = useUserStore()
  const whiteList = ['/login']
  if (!(userStore.user?.token || whiteList.includes(to.path))) {
    return '/login'
  }
  if (to.path === '/') {
    return '/home'
  }
})

// 导出路由实例
export default router
