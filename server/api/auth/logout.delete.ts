import { defineEventHandler } from '#imports'
import type { H3Event } from 'h3'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineEventHandler(async (event: H3Event) => {
  return 'Hello Nitro'
})
