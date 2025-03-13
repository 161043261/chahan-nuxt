export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  return `Hello ${name}`
})
