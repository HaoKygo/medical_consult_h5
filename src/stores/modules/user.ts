import { defineStore } from 'pinia'
import { ref } from 'vue'
// type 指明导入的是ts类型
import type { User } from '@/types/user'

/**
 * 用户store: 存储用户登录相关数据
 */
export const useUserStore = defineStore(
  'user',
  () => {
    // 登录用户
    const user = ref<User>()

    /**
     * 登录成功时存储用户
     * @param userData 用户数据
     */
    const setUser = (userData: User) => {
      user.value = userData
    }

    /**
     * 退出登录时删除用户
     */
    const delUser = () => {
      user.value = undefined
    }

    return {
      user,
      setUser,
      delUser
    }
  },
  // 开启数据持久化
  // 方式1：默认存储所有数据，以store的ID作为存储的key
  // {
  //   persist: true
  // }
  // 方式2：自定义存储的key，指定存储哪些数据
  {
    persist: {
      key: 'mc-user',
      paths: ['user'] // 数组内放入的变量名都会存储
    }
  }
)
