import { createError, defineEventHandler, readBody } from '#imports'
import bcrypt from 'bcryptjs'
import type { H3Event } from 'h3'
import { UserSchema } from '~/server/models/user.schema'
import { setAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  const { username, password } = await readBody(event)
  if (!username || !password) {
    throw createError({
      message: '账号或密码为空',
    })
  }

  // const db = mongoose.connection.db
  // const user = await db?.collection('users').findOne({ username })
  const user = await UserSchema.findOne({ username })
  if (!user) {
    throw createError({ message: '账号不存在' })
  }
  console.log(password, user.password)
  const matched = bcrypt.compareSync(password, user.password)
  if (!matched) {
    throw createError({ message: '账号或密码错误' })
  }
  await setAuth(event, user.username)
  return {}
})
