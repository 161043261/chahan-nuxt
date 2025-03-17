<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('content').path('/nuxt').first())

definePageMeta({
  layout: false, // 不使用布局
})

useSeoMeta({
  title: '学习 Nuxt',
  description: '学习 Nuxt',
})
</script>

<template>
  <div>
    <ContentRenderer v-if="data" :value="data" />
    <div v-else>content/nuxt.md 未找到</div>
  </div>
</template>
