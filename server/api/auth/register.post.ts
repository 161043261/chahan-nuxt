import { defineEventHandler, readBody, createError } from '#imports'
import bcrypt from 'bcryptjs'
import { UserSchema } from '~/server/models/user.schema'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  const hashedPassword = bcrypt.hashSync(password, 10 /** salt length */)
  //// const db = mongoose.connection.db

  try {
    //// const user = await db?.collection('users').findOne({ username })
    // const user = await UserSchema.findOne({ username })
    // if (user) {
    //   throw createError({
    //     message: '账号已存在',
    //   })
    // }
    // await db?.collection('users').insertOne({ username, password: hashedPassword })
    await UserSchema.insertOne({ username, password: hashedPassword })
  } catch (err) {
    throw createError({
      // Please prefer using message for longer error messages instead of statusMessage
      message: String(err),
    })
  }

  return ''
})
