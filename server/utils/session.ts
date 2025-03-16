import type { IAuthPayload } from '~/types'
import type { H3Event } from 'h3'
import { useRuntimeConfig, useSession } from '#imports'

const { auth } = useRuntimeConfig()

export async function useSessionManager(event: H3Event, token?: string) {
  const session = await useSession(event, {
    // auth.secretKey 必须是长度为 32 的字符串
    password: auth.secretKey,
    name: 'authorization',
  })
  if (token) {
    await session.update({ token })
  }
  // session.data: { token: '' }
  // console.log('session.data', session.data)
  return {
    ...session,
    data: session.data as IAuthPayload, // { username?: string }
  }
}
