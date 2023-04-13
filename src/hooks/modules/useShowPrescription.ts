import { getPrescription } from '@/api/consult'
import { showImagePreview } from 'vant'

export const useShowPrescription = () => {
  // 查看处方
  const showPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescription(id)
      showImagePreview([res.url])
    }
  }

  return { showPrescription }
}
