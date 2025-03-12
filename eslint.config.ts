import pluginVue from 'eslint-plugin-vue'
import { vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
// import css from '@eslint/css'
import pluginJs from '@eslint/js'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  pluginJs.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]
