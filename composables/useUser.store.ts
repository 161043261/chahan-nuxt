import type { LoginBody, MenuItem } from '~/types/user'

const _useUserState = () =>
  useState(
    'user', // key
    () => {
      // 菜单
      const menu = JSON.parse(sessionStorage.getItem('menu') ?? '[]') as MenuItem[]
      // token
      const token = sessionStorage.getItem('token') ?? ''

      return {
        menu,
        token,
      }
    }, // initializer
  )

async function login(body: LoginBody) {
  try {
    const resData = (await $fetch('/api/user/login', {
      body,
    })) as { token: string; menu: MenuItem[] }
    console.log(resData)
    // menu.value = resData.menu
    _useUserState().value.menu = resData.menu
    _useUserState().value.token = resData.token
    // token.value = resData.token
  } catch (err) {
    if (import.meta.dev) {
      console.error(err)
    }
  }
}

async function logout() {
  _useUserState().value = {
    menu: [],
    token: '',
  }
}

export function useUserState() {
  const userState = _useUserState()
  return {
    loggedIn: computed(() => Boolean(userState.value.token)),
    user: userState,
    login,
    logout,
  }
}
