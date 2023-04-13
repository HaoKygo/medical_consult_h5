import type {
  FirstDep,
  Image,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  PartialConsult,
  ConsultOrderDetail,
  ConsultOrderListParams,
  ConsultOrderPage
} from '@/types/consult'
import { request } from '@/utils/request'

/**
 * 获取全部科室
 * @returns FirstDep
 */
export const getAllDep = () => {
  return request.get<any, FirstDep[]>('/dep/all')
}

/**
 * 上传图片文件
 * @param file 图片文件
 */
export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<any, Image>('/upload', formData)
}

/**
 * 问诊订单预支付请求
 * @param params ConsultOrderPreParams
 * @returns ConsultOrderPreData
 */
export const getConsultOrderPre = (params: ConsultOrderPreParams) => {
  return request.get<any, ConsultOrderPreData>('/patient/consult/order/pre', { params })
}

/**
 * 生成订单
 * @param consultData 问诊数据
 * @returns { id: string }
 */
export const createConsultOrder = (consultData: PartialConsult) => {
  return request.post<any, { id: string }>('/patient/consult/order', consultData)
}

/**
 * 获取支付地址 订单-支付接口
 * @param data
 * @returns { payUrl: string }
 */
export const getConsultOrderPayUrl = (data: {
  paymentMethod: 0 | 1 // 0 是微信  1 支付宝
  orderId: string // 订单id
  payCallback: string // 回调地址
}) => {
  return request.post<any, { payUrl: string }>('/patient/consult/pay', data)
}

/**
 * 问诊-查询订单详情信息-找医生、极速问诊和开药问诊
 * @param orderId 订单id
 * @returns ConsultOrderDetail
 */
export const getConsultOrderDetail = (orderId: string) => {
  return request.get<any, ConsultOrderDetail>('/patient/consult/order/detail', {
    params: { orderId }
  })
}

/**
 * 药品订单-根据处方ID查询处方单
 * @param id 处方id
 * @returns { url: string } - 处方单图片url
 */
export const getPrescription = (id: string) => {
  return request.get<any, { url: string }>(`/patient/consult/prescription/${id}`)
}

/**
 * 问诊-订单-评价医生
 * @param data
 * @returns 评价id
 */
export const evaluateConsultOrder = (data: {
  docId: string // 评价的医生id
  orderId: string // 订单id
  score: number // 评价分数
  content: string // 评价内容
  anonymousFlag: number // 匿名标志
}) => {
  return request.post<any, { id: string }>('/patient/order/evaluate', data)
}

/**
 * 问诊记录-订单列表-找医生、极速问诊、开药问诊
 * @param params 问诊订单列表查询参数
 * @returns ConsultOrderPage
 */
export const getConsultOrderList = (params: ConsultOrderListParams) => {
  return request.get<any, ConsultOrderPage>('/patient/consult/order/list', { params })
}

/**
 * 订单-取消订单
 * @param id 订单id
 * @returns
 */
export const cancelOrder = (id: string) => {
  return request.put(`/patient/order/cancel/${id}`)
}

/**
 * 删除订单
 * @param id 订单id
 * @returns
 */
export const deleteOrder = (id: string) => {
  return request.delete(`/patient/order/${id}`)
}
