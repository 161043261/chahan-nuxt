//! useState<T>(init?: () => T | Ref<T>): Ref<T>
//! useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>

// 使用 `import.meta.client` 判断是否为客户端
// 收到警告 Server rendered element contains fewer child nodes than client vdom.

import type { Res } from '~/types/resp'
import type { ILoginBody, IMenuItem } from '~/types/user'

// 必须使用高阶函数
const _useUserState = () => {
  return useState(
    'user', // key
    () => {
      //! sessionStorage is not defined
      const username = import.meta.client ? (sessionStorage.getItem('username') ?? '') : ''
      // 菜单
      const menuList = (
        import.meta.client ? JSON.parse(sessionStorage.getItem('menuList') ?? '[]') : []
      ) as IMenuItem[]
      // token
      const token = import.meta.client ? (sessionStorage.getItem('auth') ?? '') : ''

      return {
        username,
        menuList,
        token,
      }
    }, // initializer
  )
}

async function login(data: ILoginBody) {
  try {
    const res = (await $fetch('/api/user/login', {
      body: data,
      method: 'POST',
      headers: [],
    })) as Res<{ token: string; menuList: IMenuItem[] }>
    const {
      data: { menuList: menuList_, token: token_ },
    } = res
    _useUserState().value.username = data.username
    _useUserState().value.menuList = menuList_
    _useUserState().value.token = token_

    ////////////////////////////////////////////////
    const token = useCookie<string>('user_state_token')
    token.value = token_
    ////////////////////////////////////////////////

    if (import.meta.client) {
      sessionStorage.setItem('username', data.username)
      sessionStorage.setItem('menuList', JSON.stringify(menuList_))
      sessionStorage.setItem('token', token_)
    }
  } catch (err) {
    if (import.meta.dev) {
      console.error(err)
    }
  }
}

function reset() {
  _useUserState().value = {
    username: '',
    menuList: [],
    token: '',
  }
  if (import.meta.client) {
    sessionStorage.clear()
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
    username: computed(() =>
      import.meta.client ? sessionStorage.getItem('username') : userState.value.username,
    ),
    menuList: computed(() =>
      import.meta.client
        ? JSON.parse(sessionStorage.getItem('menuList') ?? '[]')
        : userState.value.menuList,
    ),
    token: computed(() =>
      import.meta.client ? sessionStorage.getItem('token') : userState.value.token,
    ),
    login,
    reset,
    logout,
  }
}
