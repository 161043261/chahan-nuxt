import type { AuthPayload } from '~/types'
import type { H3Event } from 'h3'
import { useRuntimeConfig, useSession } from '#imports'

const { auth } = useRuntimeConfig()

export async function useSessionStorage(event: H3Event, username?: string) {
  const session = await useSession(event, {
    // secretKey 默认使用 .env 中的 AUTH_SECRET_KEY 环境变量
    // 如果 .env 中没有该环境变量, 则使用 32 位随机数

    // password: 加密 session tokens 的私钥
    password: auth.secretKey,
    name: 'authorization',
  })

  if (username) {
    await session.update({ username })
  }

  console.log('session', session)
  console.log('session.data', session.data)

  return {
    ...session,
    data: session.data as AuthPayload, // { username?: string }
  }
}
