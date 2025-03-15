import { defineNuxtModule, logger } from '@nuxt/kit'
import type { Nuxt } from 'nuxt/schema'
type ExcludeRoutes = ['login', 'register', 'logout']

export interface ModuleOptions {
  secretKey: string
  excludeRoutes: Array<ExcludeRoutes[number]>
}

export default defineNuxtModule<ModuleOptions>({
  defaults: {
    secretKey: process.env.AUTH_SECRET_KEY as string,
    excludeRoutes: [],
  },

  async setup(options: ModuleOptions, nuxt: Nuxt) {
    // secretKey 默认使用 .env 中的 AUTH_SECRET_KEY 环境变量
    // 如果 .env 中没有该环境变量, 则使用 32 位随机数
    const secretKey =
      options.secretKey ?? `${Date.now()} + ${Math.random()}`.replace('.', '').slice(0, 32)

    nuxt.options.runtimeConfig.auth = {
      secretKey,
      excludeRoutes: options.excludeRoutes,
    }

    logger.debug("runtimeConfig:", nuxt.options.runtimeConfig)
  },
})
