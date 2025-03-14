import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  const hashedPassword = bcrypt.hashSync(password, 10 /** salt length */)
  const db = mongoose.connection.db

  try {
    const user = await db?.collection('users').findOne({ username })

    if (user) {
      throw createError({
        // Please prefer using message for longer error messages instead of statusMessage
        message: '用户已存在',
      })
      // return
    }

    await db?.collection('users').insertOne({
      username,
      password: hashedPassword,
    })
  } catch (err) {
    throw createError({
      // Please prefer using message for longer error messages instead of statusMessage
      message: String(err),
    })
  }

  return ''
})
