import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // 打印所有 Vue 错误, 包括已处理的错误
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error(error, instance, info)
  }

  // 等价于
  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error(error, instance, info)
  })

  // 打印所有启动错误
  nuxtApp.hook('app:error', (error) => {
    console.error(error)
  })
})
