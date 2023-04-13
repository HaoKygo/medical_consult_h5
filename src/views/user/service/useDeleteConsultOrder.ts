import type { ConsultOrderDetail } from '@/types/consult'
import { deleteOrder } from '@/api/consult'
import { showFailToast, showSuccessToast } from 'vant'
import { ref } from 'vue'

export const useDeleteConsultOrder = (success?: () => void) => {
  // 删除订单
  const deleteLoading = ref(false)
  const deleteConsultOrder = async (order: ConsultOrderDetail) => {
    deleteLoading.value = true
    try {
      await deleteOrder(order.id)
      showSuccessToast('删除成功')
      // 成功回调
      if (success) {
        success()
      }
    } catch (error) {
      console.log(error)
      showFailToast('删除失败')
    } finally {
      deleteLoading.value = false
    }
  }

  return { deleteLoading, deleteConsultOrder }
}
