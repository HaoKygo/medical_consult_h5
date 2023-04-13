/**
 * 问诊相关类型
 */
import { type ConsultType, type ConsultTime, type OrderType } from '@/enums'
import type { Doctor, PageParams } from './home'
import type { Patient } from './user'

// 图片类型
export type Image = {
  url: string
  id?: string
}

// 问诊记录 - 极速问诊参数
export type Consult = {
  // 就诊类型1找医生 2极速问诊 3开药问诊 - 默认是1
  type: ConsultType
  // 极速问诊类型：0普通1三甲
  illnessType: 0 | 1
  // 患者id,用于关联患者信息
  patientId: string
  // 选择的科室id-极速问诊必填(选择的科室)
  depId: string
  // 病情--症状描述
  illnessDesc: string
  // 找医生/极速问诊-患病时间1一周内2一月内3半年内4半年以上
  illnessTime: ConsultTime
  // 找医生/极速问诊-是否就诊过0未就诊1就诊过
  consultFlag: 0 | 1
  // 补充病例信息-图片集合
  pictures: Image[]
  // 使用优惠券，必传可使用优惠券id
  couponId: string
}

// 问诊记录-全部可选
// Required 转换为全部必须   Partial 转换问全部可选  两个内置的泛型类型
export type PartialConsult = Partial<Consult>

// 病情描述 - 全部必填(不在类型上校验)
export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 科室
export type SubDep = {
  id: string
  name: string
}

// 一级科室
export type FirstDep = SubDep & {
  child: SubDep[]
}

// 问诊订单预支付请求参数
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预支付返回数据
export type ConsultOrderPreData = {
  // 实付金额
  actualPayment: number
  // 应付款/价格-图文或者极速的费用，极速普通10元，三甲39元
  payment: number
  // 积分可抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 使用的优惠券id-使用优惠券时，返回
  couponId?: string
}

// 问诊订单详情类型
export type ConsultOrderDetail = Consult & {
  // 订单id
  id: string
  // 订单创建时间
  createTime: string
  // 咨询的医生
  docInfo?: Pick<
    Doctor,
    | 'id'
    | 'name'
    | 'avatar'
    | 'depName'
    | 'positionalTitles'
    | 'hospitalName'
    | 'gradeName'
  >
  // 患者id,用于关联患者信息
  patientInfo: Patient
  // 订单编号
  orderNo: string
  // 问诊的订单状态
  statusValue: string
  // typeValue: string
  // 订单状态
  status: OrderType
  // 倒计时-1表示计时已过(单位s)
  countdown: number
  // 处方id信息
  prescriptionId?: string
  // 存在评价，返回评价id
  evaluateId: number
  // 应付款/价格
  payment: number
  // 优惠券抵扣
  couponDeduction: number
  // 积分可抵扣
  pointDeduction: number
  // 实付金额
  actualPayment: number
}

// 根据共同订单分页定义问诊订单列表查询参数
export type ConsultOrderListParams = PageParams & {
  type: ConsultType
}

// 带分页的订单类型
export type ConsultOrderPage = {
  // 总条数
  total: number
  // 总页数
  pageTotal: number
  // 订单数组
  rows: ConsultOrderDetail[]
}
