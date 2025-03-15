import { defineEventHandler, getRequestURL } from '#imports'

export default defineEventHandler((event) => {
  console.log('新请求的 URL:', getRequestURL(event).href)
})
