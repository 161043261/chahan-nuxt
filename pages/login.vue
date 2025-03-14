<script setup lang="tsx">
import { Lock, Rice, User } from '@icon-park/vue-next'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, type FormRules } from 'element-plus'

// macros
definePageMeta({
  layout: false, // 不使用布局
  name: 'login',
})

// const emit = defineEmits(['update:modelValue'])

interface IFormData {
  username: string
  password: string
}

const formData = reactive<IFormData>({
  username: 'admin',
  password: '1111',
})

const formRules = reactive<FormRules<IFormData>>({
  username: [
    { required: true, message: '账号是必填项', trigger: 'blur' },
    { min: 4, max: 16, message: '账号是4到16个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '账号格式错误', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码是必填项', trigger: 'blur' },
    { min: 4, max: 16, message: '密码是4到16个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '密码格式错误', trigger: 'blur' },
  ],
})

const formRef = ref<InstanceType<typeof ElForm>>()
// ref<InstanceType<typeof ElForm>>()

// const user = useUser()
const router = useRouter()

const handleInput = () => {
  console.log(formData.username, formData.password)
}

const handleLogin = () => {}

const handleRegister = () => {
  formRef.value?.validate(async (isValid: boolean) => {
    if (isValid) {
      const data = await $fetch('/api/auth/register', {
        method: 'POST',
        body: formData,
      })
      console.log(data)
      ElMessage.success({
        message: '注册成功',
        grouping: true,
      })
    }
  })
}

const Login = defineComponent(() => {
  return () => (
    <div class="bg h-dvh bg-cover bg-center bg-no-repeat">
      <div class="glass-container absolute top-[50%] left-[10%] h-[300px] w-[500px] translate-y-[-50%] rounded-3xl p-[50px]">
        <div class="mb-[20px] flex items-center justify-center gap-[10px]">
          <Rice theme="filled" size="48" fill="#b8e986" strokeWidth={3} />
          <h1 class="text-3xl text-slate-500">炒饭机器人管理平台</h1>
        </div>

        <ElForm
          class="w-[80%]"
          model={formData}
          labelWidth={'auto'}
          rules={formRules}
          ref={formRef}
        >
          <ElFormItem label="账号" prop="username">
            <ElInput
              v-model={formData.username}
              placeholder="请输入账号"
              prefixIcon={User}
              onInput={handleInput}
            />
          </ElFormItem>

          <ElFormItem label="密码" prop="password">
            <ElInput
              v-model={formData.password}
              placeholder="请输入密码"
              prefixIcon={Lock}
              type="password"
              onInput={handleInput}
            />
          </ElFormItem>

          <div class="flex flex-row-reverse gap-[20px]">
            <ElButton type="default" class="w-[100px]" onClick={handleRegister}>
              注册
            </ElButton>
            <ElButton type="success" class="w-[100px]" onClick={handleLogin}>
              登录
            </ElButton>
          </div>
        </ElForm>
      </div>
    </div>
  )
})
</script>

<template>
  <main>
    <Login />
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/scss/global.scss';

.el-button {
  border: none;
}

.el-button--success {
  background-color: var(--color-green);
}

.bg {
  background-image: url('~/assets/img/bg.jpg');
}

.glass-container {
  position: absolute;
  @include global.glass-container(5px /** blurVal */);
}
</style>
