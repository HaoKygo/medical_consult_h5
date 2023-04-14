import { createApp } from 'vue'

import App from './App.vue'
import pinia from './stores'
import router from './router'

// vant组件库需要单独引入的样式
import './styles/main.scss'

// 注册svg图标
import 'virtual:svg-icons-register'

// Toast 组件是以函数形式提供的，如果项目中使用 unplugin-vue-components 插件来自动引入组件样式
// 则无法正确识别 Toast, Dialog, ImagePreview 组件，因此需要手动引入 Toast, dialog 组件的样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'

// 创建vue根实例
const app = createApp(App)

// 注册pinia和router
app.use(pinia)
app.use(router)
// 挂载渲染App根组件
app.mount('#app')

console.log('环境变量：', import.meta.env)
