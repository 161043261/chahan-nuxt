import { defineEventHandler, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  console.log('runtimeConfig:', runtimeConfig)
  return { runtimeConfig }
})
