import { useAuthState } from '~/composables/useAuth.store'
import { WHITE_LIST } from '~/constants'

export default defineNuxtRouteMiddleware((to /** , from */) => {
  const { loggedIn } = useAuthState()
  // watch(() => loggedIn.value, () => {
  if (!WHITE_LIST.has(to.path) && !loggedIn.value) {
    return navigateTo('/login')
  }
  // })

  if (to.path === '/') {
    navigateTo('/dashboard')
  }
})
