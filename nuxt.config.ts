/* eslint-disable @typescript-eslint/ban-ts-comment */
// https://nuxt.com/docs/api/configuration/nuxt-config

// import vue from '@vitejs/plugin-vue'
// import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from '@tailwindcss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { ViteConfig } from 'nuxt/schema'
import { visualizer } from 'rollup-plugin-visualizer'

export const viteConfig: ViteConfig = {
  plugins: [
    // vue(), // 不要用!
    // vueDevTools(), // 不要用!

    // nuxt 使用 tailwindcss
    // @ts-ignore
    tailwindcss(),
    // @ts-ignore
    vueJsx(),
    visualizer({ open: true }),
  ],
}

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
    myServerToken: '',

    public: {
      // public 中的键在客户端也可用
      myToken: '',
    },

    redis: {
      host: '',
      port: 0,
    },

    mongoose: {
      uri: process.env.MONGODB_URI,
      devtools: false,
      options: {},
    },
  },

  //! nuxt 使用 tailwindcss
  //! 导入 element-plus 样式表
  css: [
    '~/assets/css/tailwind.css', // @
    '~/assets/scss/global.scss', // @
    'element-plus/dist/index.css',
    'animate.css',
  ],

  vite: viteConfig,

  // Nuxt 自带 postcss
  postcss: {
    plugins: {},
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    // 开启布局过渡
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  modules: ['@nuxt/eslint', 'nuxt-mongoose', '@pinia/nuxt'],
})
