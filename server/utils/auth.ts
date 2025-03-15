import type { H3Event } from 'h3'

export async function getAuth(event: H3Event) {
  //  return getCookie(event, 'authorization')
  return (await sessionUtil(event)).data.username
}

export async function setAuth(event: H3Event, username: string) {
  const token = await createJwt(username)
  // return setCookie(event, 'authorization', token)
  return await sessionUtil(event, token)
}

export async function clearAuth(event: H3Event) {
  // return deleteCookie(event, 'authorization')
  return (await sessionUtil(event)).clear()
}

export async function requireAuth(event: H3Event) {
  const token = await getAuth(event)
  if (!token)
    throw createError({
      statusCode: 401,
      statusText: 'Unauthorized',
    })
  const payload = await verifyJwt(token)
  return payload
}
