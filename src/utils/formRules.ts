import type { FieldRule } from 'vant'
import { idCardReg } from './idCardFunction'

/**
 * 表单校验规则
 */
// 手机号规则
export const mobileRules: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

// 密码规则
export const passwordRules: FieldRule[] = [
  { required: true, message: '请输入密码' },
  { pattern: /^[a-zA-Z0-9]{8,24}$/, message: '密码需包含8-24个字符' }
]

// 短信验证码规则
export const verificaitonCodeRules: FieldRule[] = [
  { required: true, message: '请输入正确的验证码' },
  { pattern: /^\d{6}$/, message: '6位数字验证码' }
]

// 身份证号规则
export const idCardRules: FieldRule[] = [
  { required: true, message: '请输入身份证号' },
  { pattern: idCardReg, message: '身份证号码格式不对' }
]
