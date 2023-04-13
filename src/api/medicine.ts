import type {
  MedicineOrderPre,
  Address,
  MedicineOrderDetail,
  Express
} from '@/types/medicine'
import { request } from '@/utils/request'

/**
 * 药品订单-支付药款页面-根据处方信息计算药款
 * @param params 处方id
 * @returns {MedicineOrderPre}
 */
export const getMedicineOrderPre = (params: { prescriptionId: string }) => {
  return request.get<any, MedicineOrderPre>('/patient/medicine/order/pre', { params })
}

/**
 * 订单-查询收货地址列表
 * @returns {Address[]}
 */
export const getAddressList = () => {
  return request.get<any, Address[]>('/patient/order/address')
}

/**
 * 药品订单-根据处方下药品订单
 * @param data 请求体数据
 * @returns 药品订单id
 */
export const createMedicineOrder = (data: {
  id: string
  addressId: string
  couponId?: string
}) => {
  return request.post<any, { id: string }>('/patient/medicine/order', data)
}

/**
 * 药品订单-查询订单详情信息
 * @param id 药品订单id
 * @returns {MedicineOrderDetail}
 */
export const getMedicineOrderDetail = (id: string) => {
  return request.get<any, MedicineOrderDetail>(`/patient/medicine/order/detail/${id}`)
}

/**
 * 订单-查询物流信息
 * @param id 订单id
 * @returns {Express}
 */
export const getMedicineOrderLogistics = (id: string) => {
  return request.get<any, Express>(`/patient/order/${id}/logistics`)
}
