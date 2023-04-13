// 问诊类型
// 1: 找医生  2: 极速问诊  3: 开药问诊
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}

// 患病时间
// 1：一周内  2：一月内  3：半年内  4：半年以上
export enum ConsultTime {
  Week = 1,
  Month = 2,
  HalfYear = 3,
  AfterHalfYear = 4
}

/* 问诊室 */
// 消息类型
export enum MsgType {
  // 文字
  MsgText = 1,
  // 图片
  MsgImage = 4,
  // 患者
  CardPatient = 21,
  // 处方
  CardPrescription = 22,
  // 未评价
  CardNotEva = 23,
  // 已评价
  CardEva = 24,
  // 通用消息
  Notify = 31,
  // 温馨提示
  NotifyTip = 32,
  // 取消订单
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  // 未支付
  NotPay = 1,
  // 已支付
  Payed = 2,
  // 无效
  Invalid = 3
}

// 问诊订单状态
export enum OrderType {
  // ----------------问诊订单------------------
  // 待支付
  ConsultPayWait = 1,
  // 待接诊
  ConsultWait = 2,
  // 咨询中
  ConsultChat = 3,
  // 已完成
  ConsultComplete = 4,
  // 已取消
  ConsultCancel = 5,
  // ----------------药品订单------------------
  // 待支付
  MedicinePayWait = 10,
  // 待发货
  MedicineSendWait = 11,
  // 待收货
  MedicineReceiveWait = 12,
  // 已完成
  MedicineComplete = 13,
  // 已取消
  MedicineCancel = 14
}

// 药品订单派送状态
export enum ExpressStatus {
  // 已发货
  Sended = 1,
  // 已揽件
  Collected = 2,
  // 运输中
  Transitting = 3,
  // 派送中
  Delivering = 4,
  // 已签收
  Signed = 5
}
