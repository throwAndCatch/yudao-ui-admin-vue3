<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="应用名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入应用名称" />
      </el-form-item>
      <el-form-item label="头像地址" prop="avatar">
        <el-input v-model="formData.avatar" placeholder="请输入头像地址" />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <Editor v-model="formData.description" height="150px" />
      </el-form-item>
      <el-form-item label="开场介绍" prop="prologue">
        <el-input v-model="formData.prologue" placeholder="请输入开场介绍" />
      </el-form-item>
      <el-form-item label="相似度" prop="similarity">
        <el-input v-model="formData.similarity" placeholder="请输入相似度" />
      </el-form-item>
      <el-form-item label="单词检索条数" prop="retrievedEntries">
        <el-input v-model="formData.retrievedEntries" placeholder="请输入单词检索条数" />
      </el-form-item>
      <el-form-item label="未命中策略 0--默认知识库  1--固定文案" prop="missedPolicies">
        <el-input v-model="formData.missedPolicies" placeholder="请输入未命中策略 0--默认知识库  1--固定文案" />
      </el-form-item>
      <el-form-item label="固定文案" prop="fixedCopy">
        <el-input v-model="formData.fixedCopy" placeholder="请输入固定文案" />
      </el-form-item>
      <el-form-item label="知识库类型，字典值" prop="knowledgeBaseType">
        <el-select v-model="formData.knowledgeBaseType" placeholder="请选择知识库类型，字典值">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="记忆" prop="memory">
        <el-input v-model="formData.memory" placeholder="请输入记忆" />
      </el-form-item>
      <el-form-item label="温度" prop="temperature">
        <el-input v-model="formData.temperature" placeholder="请输入温度" />
      </el-form-item>
      <el-form-item label="应用设定" prop="appSetting">
        <el-input v-model="formData.appSetting" placeholder="请输入应用设定" />
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="formData.link" placeholder="请输入链接" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { AppApi, AppVO } from '@/api/ai/app'

/** 应用 表单 */
defineOptions({ name: 'AppForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
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
  link: undefined
})
const formRules = reactive({
  name: [{ required: true, message: '应用名称不能为空', trigger: 'blur' }],
  avatar: [{ required: true, message: '头像地址不能为空', trigger: 'blur' }],
  nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  retrievedEntries: [{ required: true, message: '单词检索条数不能为空', trigger: 'blur' }],
  missedPolicies: [{ required: true, message: '未命中策略 0--默认知识库  1--固定文案不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await AppApi.getApp(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as AppVO
    if (formType.value === 'create') {
      await AppApi.createApp(data)
      message.success(t('common.createSuccess'))
    } else {
      await AppApi.updateApp(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
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
    link: undefined
  }
  formRef.value?.resetFields()
}
</script>