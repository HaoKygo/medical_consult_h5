import { ref } from 'vue'
import { followDoctor } from '@/api/home'
import type { FollowType } from '@/types/home'

/**
 * van-button关注按钮点击逻辑
 * @param followType 关注类型
 * @returns 关注状态，关注操作
 */
export const useFollow = (followType: FollowType = 'doc') => {
  // 关注操作加载状态
  const isFollowLoading = ref(false)
  // 关注操作
  const follow = async (obj: { id: string; likeFlag?: number }) => {
    // 防止重复点击
    isFollowLoading.value = true
    try {
      await followDoctor(obj.id, followType)
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      // 无论 trycatch 块执行结果如何，都关闭van-button的loading
      isFollowLoading.value = false
    }
  }

  return { isFollowLoading, follow }
}
