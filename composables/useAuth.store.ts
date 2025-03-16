// composables 目录下的组合函数可以自动导入
// Nuxt 仅扫描 composables/ 目录的顶层文件
import { useState } from '#imports'
import type { AuthPayload } from '~/types'

//! A composable that requires access to the Nuxt instance was called outside of a
//! plugin, Nuxt hook, Nuxt middleware, or Vue setup function.
// 必须使用高阶函数
const _useAuthState = () => useState<AuthPayload>('auth' /** key */, () => ({}) /** initializer */)

async function clear() {
  // await $fetch('/api/auth/logout', {
  //   method: 'DELETE',
  // })
  _useAuthState().value = {}
}

export function useAuthState() {
  const authState = _useAuthState()
  return {
    loggedIn: computed(() => Boolean(authState.value?.username)),
    user: () => authState,
    clear,
  }
}
