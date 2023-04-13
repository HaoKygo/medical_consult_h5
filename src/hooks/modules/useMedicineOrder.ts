import type { MedicineOrderDetail } from '@/types/medicine'
import { getMedicineOrderDetail } from '@/api/medicine'
import { ref, onMounted } from 'vue'

export const useMedicineOrder = (id: string) => {
  const loading = ref(false)
  const medicineOrder = ref<MedicineOrderDetail>()
  onMounted(async () => {
    loading.value = true
    try {
      const res = await getMedicineOrderDetail(id)
      medicineOrder.value = res
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  })

  return { loading, medicineOrder }
}
