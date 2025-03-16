import type { ILoginBody, IMenuItem } from '~/types/user'

// 必须使用高阶函数
const _useUserState = () =>
  useState(
    'user', // key
    () => {
      //! sessionStorage is not defined
      // 菜单
      const menu = [] as IMenuItem[]
      // token
      const token = ''

      return {
        menu,
        token,
      }
    }, // initializer
  )

async function login(body: ILoginBody) {
  try {
    const resData = (await $fetch('/api/user/login', {
      body,
      method: 'POST',
      headers: [],
    })) as { token: string; menu: IMenuItem[] }
    _useUserState().value.menu = resData.menu
    _useUserState().value.token = resData.token
  } catch (err) {
    if (import.meta.dev) {
      console.error(err)
    }
  }
}

function reset() {
  _useUserState().value = {
    menu: [],
    token: '',
  }
}

async function logout() {
  await $fetch('/api/user/logout', {
    method: 'DELETE',
  })
  reset()
}

export function useUserState() {
  const userState = _useUserState()
  return {
    loggedIn: computed(() => Boolean(userState.value.token)),
    menu: computed(() => userState.value.menu),
    token: computed(() => userState.value.token),
    login,
    reset,
    logout,
  }
}
