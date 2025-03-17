import type { Res } from '~/types/resp'
import type { ILoginBody, IMenuItem } from '~/types/user'

// 必须使用高阶函数
const _useUserState = () =>
  useState(
    'user', // key
    () => {
      //! sessionStorage is not defined
      // 菜单
      const menuList = [] as IMenuItem[]
      // token
      const token = ''

      return {
        menuList,
        token,
      }
    }, // initializer
  )

async function login(body: ILoginBody) {
  try {
    const res = (await $fetch('/api/user/login', {
      body,
      method: 'POST',
      headers: [],
    })) as Res<{ token: string; menuList: IMenuItem[] }>
    _useUserState().value.menuList = res.data.menuList
    _useUserState().value.token = res.data.token
  } catch (err) {
    if (import.meta.dev) {
      console.error(err)
    }
  }
}

function reset() {
  _useUserState().value = {
    menuList: [],
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
    menuList: computed(() => userState.value.menuList),
    token: computed(() => userState.value.token),
    login,
    reset,
    logout,
  }
}
