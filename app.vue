<script setup lang="ts">
</script>

<template>
  <NuxtLayout>
    <NuxtPage> </NuxtPage>
  </NuxtLayout>
</template>

<style lang="css">
/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0; /** 完全透明  */
  filter: blur(1rem); /** 页面模糊, 模糊半径 1rem, 1rem 通常是 16px  */
}

/* 布局过渡动画 */
.layout-enter-active,
.layout-leave-active {
  transition: all 1s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
