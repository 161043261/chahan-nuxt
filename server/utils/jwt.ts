import type { AuthPayload } from '~/types'
import { SignJWT, jwtVerify } from 'jose'
import { useRuntimeConfig } from 'nuxt/app'

const { auth } = useRuntimeConfig()

// auth.secretKey 默认使用 .env 中的 AUTH_SECRET 环境变量
// 如果 .env 中没有 AUTH_SECRET 环境变量
// 则使用 32 位随机数
const jwtSecret: Uint8Array = new TextEncoder().encode(auth.secretKey)

export function createJwt(username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(username)
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(jwtSecret)
}

export async function verifyJwt(token: string) {
  return (await jwtVerify(token, jwtSecret)).payload as AuthPayload
}
