/**
 * 首页相关类型
 */
// 文章类型：recommend推荐，fatReduction减脂，food健康饮食like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 文章信息类型
export type Knowledge = {
  // 收藏数量
  collectionNumber: number
  // 评论数量
  commentNumber: number
  // 内容详情
  content: string
  // 封面地址
  coverUrl: string[]
  // 创建人头像
  creatorAvatar: string
  // 创建人科室
  creatorDep: string
  // 创建人医院
  creatorHospatalName: string
  // 创建人id
  creatorId: string
  // 创建人姓名
  creatorName: string
  // 创建人职称
  creatorTitles: string
  // 文章id
  id: string
  // 是否关注0未关注1关注
  likeFlag: number
  // 文章标题
  title: string
  // 百科关联的话题
  topics: string[]
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 带分页的文章列表
export type KnowledgeListWithPage = {
  // 总页数
  pageTotal: number
  // 总条数
  total: number
  // 数据
  rows: KnowledgeList
}

// 通用的分页查询参数
export type PageParams = {
  current: number
  pageSize: number
}

// 文章列表查询参数，复用PageParams
export type KnowledgeParams = PageParams & {
  type: KnowledgeType
}

// 医生类型
export type Doctor = {
  // 医生头像
  avatar: string
  consultationNum: number
  // 科室名称
  depName: string
  // 医院等级-名称简写
  gradeName: string
  // 医院名称
  hospitalName: string
  // 医生id
  id: string
  major: string
  // 医生姓名
  name: string
  // 职称
  positionalTitles: string
  score: number
  // 接诊费用
  serviceFee: number
  // 未登录用户默认返回0，登录用户实际判断是否关注的标志1已关注0未关注
  likeFlag?: number
}

// 医生列表
export type DoctorList = Doctor[]

// 带分页的医生列表
export type DoctorListWithPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}

// 关注的类型
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'
