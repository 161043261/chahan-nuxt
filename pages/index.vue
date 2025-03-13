<script setup lang="ts">
import { ElButton } from 'element-plus'

definePageMeta({
  layout: 'default', // 默认不使用布局
})

function enableLayout(layout: 'default' | 'lightblue' | 'lightpink' | false) {
  setPageLayout(layout)
}

const counter = useState(
  'counter' /** key */,
  () => Math.round(Math.random() * 100) /** initializer */,
)

const useBar = () => useState('bar', () => 3)
const useFoo = () => useState('foo', () => 4)
const bar = useBar()
const foo = useFoo()
const addBar = () => bar.value++
const addFoo = () => foo.value++

const useBaz = () => useState('baz', () => 5)
const baz = useBaz()
const addBaz = () => baz.value++

const { clear, data, error, refresh, status } = await useFetch('/api/hello')
console.log(data.value) // { hello: 'Nitro' }
</script>

<template>
  <main>
    <NuxtLink to="/about">About page</NuxtLink>
    <ElButton type="default" @click="enableLayout(false)">不使用布局</ElButton>
    <ElButton type="success" @click="enableLayout('default')">使用默认布局</ElButton>
    <ElButton type="primary" @click="enableLayout('lightblue')">使用淡蓝色布局</ElButton>
    <ElButton type="danger" @click="enableLayout('lightpink')">使用浅粉色布局</ElButton>

    <div>
      {{ counter }}
      <ElButton @click="counter++">counter++</ElButton>
      <ElButton @click="counter--">counter--</ElButton>
    </div>

    <div>
      foo: {{ foo }}
      <ElButton @click="addFoo">addFoo</ElButton>
      bar: {{ bar }}
      <ElButton @click="addBar">addBar</ElButton>
      baz: {{ baz }}
      <ElButton @click="addBaz">addBaz</ElButton>
    </div>
  </main>
</template>

<style scoped lang="css"></style>
