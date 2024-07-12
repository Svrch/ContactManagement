<script setup lang="ts">

</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1280px;
  margin: 18px auto auto;
  padding: 20px;
  color: var(--p-card-color);
  box-shadow: var(--p-card-shadow);
  border-radius: var(--p-card-border-radius);
}
</style>
