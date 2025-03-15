// composables 目录下的组合函数可以自动导入
// Nuxt 仅扫描 composables/ 目录的顶层文件
import { computed } from 'vue'
import { useState } from '#imports'
import type { AuthPayload } from '~/types'

const _useAuthState = () => useState<AuthPayload>('auth' /** key */, () => ({}) /** initializer */)

export function useAuthState() {
  const authState = _useAuthState()
  return {
    loggedIn: computed(() => Boolean(authState.value?.username)),
  }
}
