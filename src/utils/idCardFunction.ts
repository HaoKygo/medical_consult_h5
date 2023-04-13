/**
 * 工具函数
 */

/**
 * 对身份证号作脱敏处理
 * 只显示前六位和后四位
 * @param idCard 身份证号
 * @returns 脱敏后的身份证号
 */
export const idCardDesensitization = (idCard: string): string => {
  const reg = /(^\d{6})(\d{8})([Xx\d]{4}$)/
  return idCard.replace(reg, '$1******$3')
}

/**
 * 身份证号匹配正则表达式
 * 匹配到2023年前
 */
export const idCardReg =
  /^[1-9]\d{5}(19\d{2}|20([0-1]\d|2[0-2]))((0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[01])|(02)(0[1-9]|[1-2]\d))(?!000)\d{3}[0-9Xx]$/

/**
 * 判断是否是合规的身份证号
 * @param idCard 身份证号
 * @returns 是否匹配身份证号规则
 */
export const isIdCardValid = (idCard: string): boolean => {
  if (idCard.match(idCardReg)) {
    return true
  }
  return false
}

/**
 * 从身份证号提取性别信息
 * @param idCard 身份证号
 * @returns 男性女性数字标识：1表示男性，0表示女性
 */
export const extractGenderFromIdCard = (idCard: string): number => {
  // 身份证倒数第二个字符
  const lastSecondChar = idCard[idCard.length - 2]

  // 倒数第二个数字为奇数则为男性，为偶数则为女性
  if (Number(lastSecondChar) % 2 === 1) {
    return 1
  } else {
    return 0
  }
}
