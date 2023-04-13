import type {
  User,
  VerificationCodeType,
  UserInfo,
  PatientList,
  NewPatient,
  Patient
} from '@/types/user'
import { request } from '@/utils/request'

/**
 * 密码登录
 * @param mobile 手机号
 * @param password 密码
 * @returns User
 */
export const loginByPassword = (mobile: string, password: string) => {
  return request.post<any, User>('/login/password', { mobile, password })
}

/**
 *
 * @param mobile 手机号
 * @param verificationCode 验证码
 * @returns User
 */
export const loginByVerificationCode = (mobile: string, verificationCode: string) => {
  return request.post<any, User>('/login', { mobile, code: verificationCode })
}

/**
 * 发送验证码
 * @param mobile 手机号码
 * @param type 验证码类型（登录 ｜ 注册）
 * @returns { code: string }
 */
export const sendMobileVerificationCode = (
  mobile: string,
  type: VerificationCodeType
) => {
  return request.get<any, { code: string }>('/code', {
    params: { mobile, type }
  })
}

/**
 * 获取个人信息
 * @returns UserInfo
 */
export const getUserInfo = () => {
  return request.get<any, UserInfo>('/patient/myUser')
}

/**
 * 获取患者列表
 * @returns PatientList
 */
export const getPatientList = () => {
  return request.get<any, PatientList>('/patient/mylist')
}

/**
 * 添加新患者
 * @param newPatient 新增患者
 * @returns
 */
export const addNewPatient = (newPatient: NewPatient) => {
  return request.post('/patient/add', newPatient)
}

/**
 * 编辑患者
 * @param patient 要编辑的患者
 * @returns
 */
export const editPatient = (patient: NewPatient) => {
  return request.put('/patient/update', patient)
}

/**
 * 删除患者
 * @param id 删除患者id
 * @returns
 */
export const delPatient = (id: string) => {
  return request.delete(`/patient/del/${id}`)
}

/**
 * 获取患者详情
 * @param id 患者id
 * @returns Patient
 */
export const getPatientDetail = (id: string) => {
  return request.get<any, Patient>(`/patient/info/${id}`)
}
