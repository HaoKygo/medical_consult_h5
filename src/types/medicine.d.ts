import type { Medicine } from './room'
import type { ExpressStatus } from '@/enums'

// 药品预订单数据
export type MedicineOrderPre = {
  // 处方id
  id: string
  // 积分可抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 使用的优惠券id
  couponId: string
  // 应付金额(药品总价格)
  payment: number
  // 运费
  expressFee: number
  // 实际支付
  actualPayment: number
  // 药品信息
  medicines: Medicine[]
}

// 收货地址信息
export type Address = {
  // 收货地址id
  id: string
  // 收货人姓名
  receiver: string
  // 联系方式
  mobile: string
  // 省份
  province: string
  // 市区
  city: string
  // 县区
  county: string
  // 详细地址
  addressDetail: string
  // 是否为默认，1为是，0为否
  isDefault?: 0 | 1
}

// 药品订单详情数据
export type MedicineOrderDetail = {
  // 订单id
  id: string
  // 订单编号
  orderNo: string
  // 订单类型1问医生2极速问诊3开药问诊4、药品订单
  type?: number
  // 订单创建时间
  createTime: string
  // 处方id信息
  prescriptionId?: string
  // 药品订单状态10待支付11待发货12待收货13已完成14已取消
  status: number
  // 药品订单状态10待支付11待发货12待收货13已完成14已取消
  statusValue: string
  // 取消订单原因
  cancelReason?: string
  // 取消订单原因文字
  cancelReasonValue?: string
  // 处方的药品列表信息
  medicines?: Medicine[]
  // 待支付返回的倒计时-1表示已经结束，单位s
  countdown?: number
  // 地址信息
  addressInfo: Address
  // 物流信息信息--最新的物流信息
  expressInfo?: {
    // 物流信息内容
    content: string
    // 物流信息时间
    time: string
  }
  // 支付时间
  payTime: string
  // 支付方式0微信支付，1支付宝
  paymentMethod: number
  // 应付款（药品总金额）
  payment: string
  // 优惠券抵扣金额
  couponDeduction: number
  // 运费
  expressFee: number
  // 实际付款金额
  actualPayment: number
  // 药品订单对应处方的聊天室id
  roomId: string
}

// 物流日志
export type ExpresssLog = {
  // 物流详情信息ID
  id: string
  // 信息文字
  content: string
  // 时间
  createTime: string
  // 状态code
  status: string
  // 状态值
  statusValue: string
}

// 经纬度
export type Location = {
  // 纬度信息
  latitude: string
  // 经度信息
  longitude: string
}

// 物流数据
export type Express = {
  // 预计送达时间
  estimatedTime: string
  // 公司名称
  name: string
  // 快递单号
  awbNo: string
  // 订单派送状态1已发货 2已揽件 3 运输中 4 派送中 5已签收
  status: ExpressStatus
  // 订单状态值
  statusValue: string
  // 当前位置
  currentLocationInfo: Location
  // 物流运输轨迹经纬度
  logisticsInfo: Location[]
  // 物流日志
  list: ExpresssLog[]
}
