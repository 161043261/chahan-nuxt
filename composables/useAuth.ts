// composables 目录下的组合函数可以自动导入
// Nuxt 仅扫描 composables/ 目录的顶层文件

export const useUser = () => {
  return useState('user', () => ({
    username: '',
    password: '',
  }))
}
