<script setup lang="ts">
definePageMeta({
  layout: 'default', // 使用默认布局
})

const { data } = useFetch('/api/runtimeConfig')
console.log(data)
</script>

<template>
  <div>Index page</div>
</template>

<style scoped lang="css"></style>
