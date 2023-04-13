import type { ConsultType } from '@/enums'
import type { PartialConsult, ConsultIllness } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'consult',
  () => {
    // 问诊记录数据
    const consult = ref<PartialConsult>({})
    // 设置问诊类型 - 第一步
    const setConsultType = (type: ConsultType) => (consult.value.type = type)
    // 设置极速问诊级别 - 第二步
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 设置科室 - 第三步
    const setDep = (id: string) => (consult.value.depId = id)
    // 设置病情描述 - 第四步
    // 症状描述、患病时间、是否就诊过、病例信息补充图片
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 设置患者 - 第五步
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 设置使用优惠券 - 第六步
    const setCoupon = (id: string) => (consult.value.couponId = id)
    // 清空记录
    const clearConsult = () => (consult.value = {})

    return {
      consult,
      setConsultType,
      setIllnessType,
      setDep,
      setIllness,
      setPatient,
      setCoupon,
      clearConsult
    }
  },
  {
    persist: {
      key: 'mc-consult',
      paths: ['consult']
    }
  }
)
