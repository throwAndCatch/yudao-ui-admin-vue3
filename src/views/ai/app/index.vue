<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="应用名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入应用名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="头像地址" prop="avatar">
        <el-input
          v-model="queryParams.avatar"
          placeholder="请输入头像地址"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入用户昵称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="开场介绍" prop="prologue">
        <el-input
          v-model="queryParams.prologue"
          placeholder="请输入开场介绍"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="相似度" prop="similarity">
        <el-input
          v-model="queryParams.similarity"
          placeholder="请输入相似度"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="单词检索条数" prop="retrievedEntries">
        <el-input
          v-model="queryParams.retrievedEntries"
          placeholder="请输入单词检索条数"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="未命中策略 0--默认知识库  1--固定文案" prop="missedPolicies">
        <el-input
          v-model="queryParams.missedPolicies"
          placeholder="请输入未命中策略 0--默认知识库  1--固定文案"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="固定文案" prop="fixedCopy">
        <el-input
          v-model="queryParams.fixedCopy"
          placeholder="请输入固定文案"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="知识库类型，字典值" prop="knowledgeBaseType">
        <el-select
          v-model="queryParams.knowledgeBaseType"
          placeholder="请选择知识库类型，字典值"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="记忆" prop="memory">
        <el-input
          v-model="queryParams.memory"
          placeholder="请输入记忆"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="温度" prop="temperature">
        <el-input
          v-model="queryParams.temperature"
          placeholder="请输入温度"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="应用设定" prop="appSetting">
        <el-input
          v-model="queryParams.appSetting"
          placeholder="请输入应用设定"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input
          v-model="queryParams.link"
          placeholder="请输入链接"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['ai:app:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['ai:app:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="自增主键" align="center" prop="id" />
      <el-table-column label="应用名称" align="center" prop="name" />
      <el-table-column label="头像地址" align="center" prop="avatar" />
      <el-table-column label="用户昵称" align="center" prop="nickname" />
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="开场介绍" align="center" prop="prologue" />
      <el-table-column label="相似度" align="center" prop="similarity" />
      <el-table-column label="单词检索条数" align="center" prop="retrievedEntries" />
      <el-table-column label="未命中策略 0--默认知识库  1--固定文案" align="center" prop="missedPolicies" />
      <el-table-column label="固定文案" align="center" prop="fixedCopy" />
      <el-table-column label="知识库类型，字典值" align="center" prop="knowledgeBaseType" />
      <el-table-column label="记忆" align="center" prop="memory" />
      <el-table-column label="温度" align="center" prop="temperature" />
      <el-table-column label="应用设定" align="center" prop="appSetting" />
      <el-table-column label="链接" align="center" prop="link" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['ai:app:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['ai:app:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <AppForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { AppApi, AppVO } from '@/api/ai/app'
import AppForm from './AppForm.vue'

/** 应用 列表 */
defineOptions({ name: 'App' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<AppVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  name: undefined,
  avatar: undefined,
  nickname: undefined,
  description: undefined,
  prologue: undefined,
  similarity: undefined,
  retrievedEntries: undefined,
  missedPolicies: undefined,
  fixedCopy: undefined,
  knowledgeBaseType: undefined,
  memory: undefined,
  temperature: undefined,
  appSetting: undefined,
  link: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await AppApi.getAppPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await AppApi.deleteApp(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await AppApi.exportApp(queryParams)
    download.excel(data, '应用.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>