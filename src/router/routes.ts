import type { RouteRecordRaw } from 'vue-router'

// 路由配置
const routes: RouteRecordRaw[] = [
  // 一级路由挂载点放在App.vue根组件中
  // 底部tabbar页面
  {
    // 父路由，公共组件页面
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    // 二级路由：首页，健康百科，消息中心，我的
    // 挂载点放置父路由vue文件的位置
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        // 路由元信息：给路由添加数据
        meta: { title: '首页' }
      },
      {
        path: '/article',
        component: () => import('@/views/article/index.vue'),
        meta: { title: '健康百科' }
      },
      {
        path: '/notify',
        component: () => import('@/views/notice/index.vue'),
        meta: { title: '消息中心' }
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '个人中心' }
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  // 家庭档案
  {
    path: '/user/patient',
    component: () => import('@/views/user/PatientInfo.vue'),
    meta: { title: '家庭档案' }
  },
  // 问诊记录
  {
    path: '/user/consult',
    component: () => import('@/views/user/ConsultOrder.vue'),
    meta: { title: '问诊记录' }
  },
  // 极速问诊
  {
    path: '/consult/fast',
    component: () => import('@/views/consult/ConsultFast.vue'),
    meta: { title: '极速问诊' }
  },
  // 选择科室
  {
    path: '/consult/dep',
    component: () => import('@/views/consult/ConsultDep.vue'),
    meta: { title: '选择科室' }
  },
  // 病情描述
  {
    path: '/consult/illness',
    component: () => import('@/views/consult/ConsultIllness.vue'),
    meta: { title: '病情描述' }
  },
  // 问诊支付
  {
    path: '/consult/pay',
    component: () => import('@/views/consult/ConsultPay.vue'),
    meta: { title: '问诊支付' }
  },
  // 问诊室
  {
    path: '/room',
    component: () => import('@/views/room/index.vue'),
    meta: { title: '问诊室' }
  },
  // 问诊详情
  {
    path: '/user/consult/:id',
    component: () => import('@/views/user/ConsultDetail.vue'),
    meta: { title: '问诊详情' }
  },
  // 药品支付
  {
    path: '/medicine/pay',
    component: () => import('@/views/medicine/OrderPay.vue'),
    meta: { title: '药品支付' }
  },
  // 药品支付结果
  {
    path: '/medicine/pay/result',
    component: () => import('@/views/medicine/OrderPayResult.vue'),
    meta: { title: '药品支付结果' }
  },
  // 药品订单详情
  {
    path: '/medicine/:id',
    component: () => import('@/views/medicine/OrderDetail.vue'),
    meta: { title: '药品订单详情' }
  },
  // 物流详情
  {
    path: '/medicine/express/:id',
    component: () => import('@/views/medicine/OrderExpress.vue'),
    meta: { title: '物流详情' }
  },
  // 测试
  {
    path: '/test',
    // 在路由模块顶部引入组件热更新会出问题，使用懒加载引入就没有问题XD
    component: () => import('@/views/Test/index.vue')
  }
]

export default routes
