<script setup lang="ts">
import { ElButton } from 'element-plus'

const useBar = () => useState('bar', () => 3)
const useFoo = () => useState('foo', () => 4)
const bar = useBar()
const foo = useFoo()
const addBar = () => bar.value++
const addFoo = () => foo.value++

const useBaz = () => useState('baz', () => 5)
const baz = useBaz()
const addBaz = () => baz.value++

const errorLogger = (err: unknown) => console.error(err)
</script>

<template>
  <main>
    <NuxtLink to="/">Index page</NuxtLink>
    <div>
      foo: {{ foo }}
      <ElButton @click="addFoo">addFoo</ElButton>
      bar: {{ bar }}
      <ElButton @click="addBar">addBar</ElButton>
      baz: {{ baz }}
      <ElButton @click="addBaz">addBaz</ElButton>
    </div>

    <NuxtErrorBoundary @error="errorLogger">
      <template #error="{ error, clearError }">
        客户端组件渲染错误: {{ error }}
        <button @click="clearError">清除错误</button>
      </template>
    </NuxtErrorBoundary>
  </main>

</template>
