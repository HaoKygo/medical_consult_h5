/**
 * 用户相关的ts类型
 */

// 登录返回用户数据接口
export type User = {
  // token
  token: string
  // 更新后的token
  refreshToken: string
  // 头像
  avatar?: string
  // 中间四位带星号的手机号
  mobile?: string
  // 用户名
  account?: string
  // 用户id
  id?: string
}
// 个人信息类型
type OmitUser = Omit<User, 'token' | 'refreshToken'>
export type UserInfo = OmitUser & {
  // 用户id
  id: string
  // 头像
  avatar: string
  // 中间四位带星号的手机号
  mobile: string
  // 用户名
  account: string
  // 关注数量
  likeNumber: number
  // 收藏数量
  collectionNumber: number
  // 我的总积分
  score: number
  // 我的优惠券数量
  couponNumber: number
  // 订单信息
  orderInfo: {
    // 待付款
    paidNumber: number
    // 待发货
    receivedNumber: number
    // 待收货
    shippedNumber: number
    已完成
    finishedNumber: number
  }
}

// 短信验证码类型
export type VerificationCodeType = 'login' | 'register'

// 家庭档案 - 患者信息
export type Patient = {
  id: string
  // 患者姓名
  name: string
  // 患者身份证号
  idCard: string
  // 是否设置为默认患者 0不是默认 1是默认患者
  defaultFlag: number
  // 性别 1男 0女
  gender?: number
  // 性别值
  genderValue: string
  // 年龄
  age?: number
  id: string
}
// 家庭档案 - 患者信息列表
export type PatientList = Patient[]
// 家庭档案 - 新增患者信息类型
export type NewPatient = Pick<Patient, 'name' | 'idCard' | 'defaultFlag' | 'gender'> & {
  id?: string
}
