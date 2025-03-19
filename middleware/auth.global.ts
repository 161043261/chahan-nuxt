import { useTabState } from '~/composables/use_tab.state'
import { useUserState } from '~/composables/use_user.state'
import { getTime } from '~/utils'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`[${getTime()}]`, to.path, '<==', from.path)
  const whitelist = useRuntimeConfig().public.whitelist
  const { username, menuList, token } = useUserState()
  if (import.meta.dev) {
    console.log('username:', username.value, ', token:', token?.value)
  }

  if (whitelist.includes(to.path)) {
    return
  }
  // 客户端, 不在白名单, 未登录
  if (import.meta.client && !sessionStorage.getItem('token')) {
    return navigateTo('/login')
  }
  // 已登录, 但 cookie 异常
  if (!username.value || !menuList.value) {
    return navigateTo('/login')
  }

  if (to.path === '/') {
    return navigateTo('/empty')
  }
  const tabState = useTabState()
  const { addTab } = tabState
  const item = menuList.value.find((item) => item.url === to.path)
  if (item) {
    const { icon, name } = item
    addTab(name, icon, to.path)
  }
})
