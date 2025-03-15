import bcrypt from 'bcryptjs'
import { UserSchema } from '~/server/models/user.schema'

export default defineEventHandler(async (event) => {
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
  const matched = bcrypt.compareSync(password, user.password)
  if (!matched) {
    throw createError({ message: '账号或密码错误' })
  }
  return {}
})
