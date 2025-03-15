import { promises as fs } from 'node:fs'

export default defineEventHandler(async (/** event */) => {
  try {
    const str = await fs.readFile('../pages/nuxt.md', { encoding: 'utf8' })
    console.log('str.length:', str.length)
    return str
  } catch (err) {
    throw createError({
      message: String(err),
    })
  }
})
