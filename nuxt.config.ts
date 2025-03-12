/* eslint-disable @typescript-eslint/ban-ts-comment */
// https://nuxt.com/docs/api/configuration/nuxt-config

// import vue from '@vitejs/plugin-vue'
// import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from '@tailwindcss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

// ~    /srcDir
// @    /srcDir
// ~~   /rootDir
// @@   /rootDir

// Nuxt 配置
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  $production: {
    /** 生产环境的环境变量 */
  },
  $development: {
    /** 开发环境的环境变量 */
  },
  $meta: {
    /** 元数据 */
  },

  // 使用 const runtimeConfig = useRuntimeConfig() 获取
  // nuxt.config.ts 中定义的 runtimeConfig
  runtimeConfig: {
    // 只在服务器端可用的私有键
    public: {
      // public 中的键在客户端也可用
    },
  },

  // nuxt 使用 tailwindcss
  css: ['@/assets/css/tailwind.css'],
  vite: {
    plugins: [
      // vue(), // 不要用!
      // vueDevTools(), // 不要用!

      // nuxt 使用 tailwindcss
      // @ts-ignore
      tailwindcss(),
      vueJsx(),
      visualizer({ open: true }),
    ],
  },

  // Nuxt 自带 postcss
  postcss: {
    plugins: {
    }
  }
})
