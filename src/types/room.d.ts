import type { MsgType, PrescriptionStatus } from '@/enums'
import type { Consult, Image } from './consult'
import type { Patient } from './user'

// 聊天-消息中包含处方和药品类型
// 药品
export type Medicine = {
  // 主键id
  id: string
  // 药品名称
  name: string
  // 药品价格
  amount: string
  // 药品图片
  avatar: string
  // 药品规格
  specs: string
  // 药品用法用量
  usageDosag: string
  // 是否是处方药0不是1是
  prescriptionFlag: 0 | 1
  // 选择的药品数量
  quantity: number
}

// 处方
export type Prescription = {
  // 主键id-处方id
  id: string
  // 订单id信息
  orderId: string
  // 开方时间
  createTime: string
  // 患者姓名
  name: string
  // 就诊记录id
  recordId: string
  // 患者的性别0女1男
  gender: 0 | 1
  // 患者的性别值
  genderValue: string
  // 患者年龄
  age: number
  // 诊断信息
  diagnosis: string
  // 处方状态
  status: PrescriptionStatus
  // 处方的药品信息
  medicines: Medicine[]
}

// 评价医生
export type EvaluateDoc = {
  // 评价主键
  id: string
  // 评价分数
  score: number
  // 评价内容
  content: string
  // 评价时间
  createTime: string
  // 评价人
  creator: string
}

// 聊天-消息类型
// 消息类型：聊天-接受对话信息api
export type Message = {
  // 聊天消息id
  id?: string
  // 发送人
  from?: string
  // 接收人
  to?: string
  // 消息的类型
  msgType?: MsgType
  // 发送人头像
  fromAvatar?: string
  // 接收人头像
  toAvatar?: string
  // 发送时间
  createTime?: string
  // 具体消息内容
  msg: {
    // 文本类型内容
    content?: string
    // 图片
    picture?: Image
    // 患者病情信息
    consultRecord?: Consult & {
      patientInfo: Patient
    }
    // 处方信息
    prescription?: Prescription
    // 评价医生的信息
    evaluateDoc?: EvaluateDoc
  }
}

// 聊天-查询历史聊天记录api
export type FormerMessages = {
  // 会话id-socket链接id
  sid: string
  // 订单id-关联业务id
  orderId: string
  // 会话时间
  createTime: string
  // 消息数组
  items: Message[]
}
