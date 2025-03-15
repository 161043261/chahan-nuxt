import type { AuthPayload } from '~/types'
import type { H3Event } from 'h3'

const { auth } = useRuntimeConfig()

export async function sessionUtil(event: H3Event, username?: string) {
  const session = await useSession(event, {
    password: auth.secretKey,
    name: 'authorization',
  })

  if (username) {
    await session.update({ username })
  }

  console.log(session)
  console.log(session.data)

  return {
    ...session,
    data: session.data as AuthPayload, // { username?: string }
  }
}
