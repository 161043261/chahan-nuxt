import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import nuxtConfig from './nuxt.config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const viteConfig = nuxtConfig.vite as Record<string, any>;

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
