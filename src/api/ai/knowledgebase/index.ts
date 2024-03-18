import request from '@/config/axios'

// 知识库 VO
export interface KnowledgeBaseVO {
  id: number // 自增主键
  name: string // 知识库标题
  description: string // 描述
  backendKnowledgeId: string // 模型端知识库id
}

// 知识库 API
export const KnowledgeBaseApi = {
  // 查询知识库分页
  getKnowledgeBasePage: async (params: any) => {
    return await request.get({ url: `/ai/knowledge-base/page`, params })
  },

  // 查询知识库详情
  getKnowledgeBase: async (id: number) => {
    return await request.get({ url: `/ai/knowledge-base/get?id=` + id })
  },

  // 新增知识库
  createKnowledgeBase: async (data: KnowledgeBaseVO) => {
    return await request.post({ url: `/ai/knowledge-base/create`, data })
  },

  // 修改知识库
  updateKnowledgeBase: async (data: KnowledgeBaseVO) => {
    return await request.put({ url: `/ai/knowledge-base/update`, data })
  },

  // 删除知识库
  deleteKnowledgeBase: async (id: number) => {
    return await request.delete({ url: `/ai/knowledge-base/delete?id=` + id })
  },

  // 导出知识库 Excel
  exportKnowledgeBase: async (params) => {
    return await request.download({ url: `/ai/knowledge-base/export-excel`, params })
  }
}