<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('content').path('/tutorial').first())

definePageMeta({
  layout: false, // 不使用布局
})

useSeoMeta({
  title: 'Nuxt Tutorial',
  description: 'Nuxt Tutorial',
})
</script>

<template>
  <div>
    <ContentRenderer v-if="data" :value="data" />
    <div v-else>content/tutorial.md 未找到</div>
  </div>
</template>
