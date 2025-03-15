<script setup lang="ts">
import { definePageMeta, useFetch } from '#imports'

definePageMeta({
  layout: 'default', // 使用默认布局
})

const { data } = useFetch('/api/runtimeConfig')
</script>

<template>
  <div>
    Index page
    <div>{{ JSON.stringify(data?.runtimeConfig) }}</div>
  </div>
</template>

<style scoped lang="css"></style>
