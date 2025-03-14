import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { username, password, ...rest } = await readBody(event)
  const hashedPwd = bcrypt.hashSync(password, 10 /** salt length */)
  try {
    await mongoose.connection.db?.collection('users').insertOne({
      username,
      password: hashedPwd,
      ...rest,
    })
  } catch (e) {
    if (import.meta.dev) {
      console.error(e)
    }

    throw createError({
      statusMessage: '用户已注册',
    })
  }

  return ''
})
