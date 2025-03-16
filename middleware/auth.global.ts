import { useAuthState } from '~/composables/useAuth.store'
// import { WHITE_LIST } from '~/constants'

export default defineNuxtRouteMiddleware((to /** , from */) => {
  const whitelist = useRuntimeConfig().public.whitelist
  const { loggedIn } = useAuthState()
  console.log('loggedIn:', loggedIn.value)

  // 必须使用 watch 侦听, 否则会持续打印 loggedIn
  watch(
    () => loggedIn.value,
    () => {
      // 不在白名单
      // 或未登录
      if (!whitelist.includes(to.path) || !loggedIn.value) {
        return navigateTo('/login')
      }
    },
  )

  if (to.path === '/') {
    navigateTo('/dashboard')
  }
})
