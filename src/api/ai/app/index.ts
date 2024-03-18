import request from '@/config/axios'

// 应用 VO
export interface AppVO {
  id: number // 自增主键
  name: string // 应用名称
  avatar: string // 头像地址
  nickname: string // 用户昵称
  description: string // 描述
  prologue: string // 开场介绍
  similarity: string // 相似度
  retrievedEntries: number // 单词检索条数
  missedPolicies: string // 未命中策略 0--默认知识库  1--固定文案
  fixedCopy: string // 固定文案
  knowledgeBaseType: string // 知识库类型，字典值
  memory: string // 记忆
  temperature: string // 温度
  appSetting: string // 应用设定
  link: string // 链接
}

// 应用 API
export const AppApi = {
  // 查询应用分页
  getAppPage: async (params: any) => {
    return await request.get({ url: `/system/ai/app/page`, params })
  },

  // 查询应用详情
  getApp: async (id: number) => {
    return await request.get({ url: `/system/ai/app/get?id=` + id })
  },

  // 新增应用
  createApp: async (data: AppVO) => {
    return await request.post({ url: `/system/ai/app/create`, data })
  },

  // 修改应用
  updateApp: async (data: AppVO) => {
    return await request.put({ url: `/system/ai/app/update`, data })
  },

  // 删除应用
  deleteApp: async (id: number) => {
    return await request.delete({ url: `/system/ai/app/delete?id=` + id })
  },

  // 导出应用 Excel
  exportApp: async (params) => {
    return await request.download({ url: `/system/ai/app/export-excel`, params })
  }
}
