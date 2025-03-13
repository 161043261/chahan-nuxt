export default defineEventHandler((event) => {
  // 新请求的 URL: http://localhost:3000/
  // context 的键名数组: [ 'nitro', '_nitro' ]
  // 注意: 在 pages/index.vue 中 `await useFetch('/api/hello')`

  // 新请求的 URL: http://localhost:3000/api/hello
  // context 的键名数组: [ 'nitro', '_nitro', 'auth', 'matchedRoute', 'params', '_payloadReducers' ]
  console.log('新请求的 URL:', getRequestURL(event).href)
  console.log('context 的键名数组:', Object.keys(event.context))
  event.context.auth = { timestamp: Date.now() }
})
