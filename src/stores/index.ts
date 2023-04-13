/**
 * 创建pinia实例
 */
import { createPinia } from 'pinia'
// 导入数据持久化插件
import persist from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()

// 注册持久化插件
pinia.use(persist)

// 导出pinia实例
export default pinia

// 对modules中的store做统一导出
export * from './modules/user'
export * from './modules/consult'
