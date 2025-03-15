<script setup lang="ts">
const { data } = await useFetch('/api/readme'/** , { method: 'GET' } */)
console.log(data)
</script>

<template>
  <div>
    <MDC :value="data ?? 'empty'" tag="article" />
  </div>
</template>
