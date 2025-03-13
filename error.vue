<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div>
    <p>statusCode: {{ error.statusCode }}</p>
    <p>fatal: {{ error.fatal }}</p>
    <p>unhandled: {{ error.unhandled }}</p>
    <p>statusMessage: {{ error.statusMessage }}</p>
    <!-- 可以在 data 中设置自定义字段 -->
    <p>data: {{ JSON.stringify(error.data) }}</p>
    <p>cause: {{ JSON.stringify(error.cause) }}</p>
    <button @click="handleError">handleError</button>
  </div>
</template>
