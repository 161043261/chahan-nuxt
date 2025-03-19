import { useTabState } from '~/composables/use_tab.state'
import { useUserState } from '~/composables/use_user.state'
import { getTime } from '~/utils'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`[${getTime()}]`, to.path, '<==', from.path)
  const whitelist = useRuntimeConfig().public.whitelist
  const { username, token } = useUserState()
  if (import.meta.dev) {
    console.log('username:', username, ', token:', token)
  }

  // 客户端, 不在白名单, 未登录
  if (import.meta.client && !whitelist.includes(to.path) && !sessionStorage.getItem('token')) {
    return navigateTo('/login')
  }

  if (to.path === '/') {
    return navigateTo('/dashboard')
  }

  const userState = useUserState()
  const tabState = useTabState()
  const { menuList } = userState
  const { addTab } = tabState
  const item = menuList.value.find((item) => item.url === to.path)
  if (item) {
    const { icon, name } = item
    addTab(name, icon, to.path)
  }
})
