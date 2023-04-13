import type {
  KnowledgeListWithPage,
  KnowledgeParams,
  PageParams,
  DoctorListWithPage,
  FollowType
} from '@/types/home'
import { request } from '@/utils/request'

/**
 * 获取文章列表
 * @param params 文章列表接口参数
 * @returns KnowledgeListWithPage
 */
export const getKnowledgeListWithPage = (params: KnowledgeParams) => {
  return request.get<any, KnowledgeListWithPage>('/patient/home/knowledge', { params })
}

/**
 * 获取关注医生列表
 * @param params 通用分页接口参数
 * @returns DoctorListWithPage
 */
export const getDoctorListWithPage = (params: PageParams) => {
  return request.get<any, DoctorListWithPage>('/home/page/doc', { params })
}

/**
 * 关注请求
 * @param id 关注对象对应的id
 * @param type 关注类型
 * @returns
 */
export const followDoctor = (id: string, type: FollowType = 'doc') => {
  return request.post('like', { id, type })
}
