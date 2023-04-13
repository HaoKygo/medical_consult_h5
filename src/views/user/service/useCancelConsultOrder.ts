import type { ConsultOrderDetail } from '@/types/consult'
import { cancelOrder } from '@/api/consult'
import { OrderType } from '@/enums'
import { ref } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'

export const useCancelConsultOrder = () => {
  // 取消订单
  const cancelLoading = ref(false)
  const cancelConsultOrder = async (order: ConsultOrderDetail) => {
    cancelLoading.value = true
    try {
      await cancelOrder(order.id)
      // 修改订单状态
      order.status = OrderType.ConsultCancel
      order.statusValue = '已取消'
      showSuccessToast('取消成功')
    } catch (error) {
      console.log(error)
      showFailToast('取消失败')
    } finally {
      cancelLoading.value = false
    }
  }

  return { cancelLoading, cancelConsultOrder }
}
