<script lang="ts" setup></script>

<template>
  <main class="h-dvh w-dvw layout-default">
    <header>默认布局的页眉</header>
    <slot />
  </main>
</template>

<style lang="css" scoped>
.layout-default {
  background: lightgreen;
}
</style>
