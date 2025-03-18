import { useUserState } from '~/composables/use_user.state'
import { getTime } from '~/utils'
// import { WHITE_LIST } from '~/constants'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`[${getTime()}]`, to.fullPath, '<==', from.fullPath)

  const whitelist = useRuntimeConfig().public.whitelist
  const { loggedIn } = useUserState()

  if (import.meta.dev) {
    watchEffect(() => console.log('watchEffect loggedIn.value:', loggedIn.value))
  }

  // 必须使用 watch 侦听, 否则会持续打印 loggedIn
  // watch(
  //   () => loggedIn.value,
  //   (newVal, oldVal) => {
  if (import.meta.dev) {
    // console.log(`loggedIn: ${newVal} <== ${oldVal}`)
    console.log(`loggedIn: ${loggedIn.value}`)
  }
  // 不在白名单
  // 或未登录
  if (!whitelist.includes(to.path) && !loggedIn.value) {
    navigateTo('/login')
    return
  }
  //   },
  // )
  if (to.path === '/') {
    navigateTo('/dashboard')
  }
})
