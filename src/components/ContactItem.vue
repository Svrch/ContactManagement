<script setup lang="ts">
const props = defineProps({
  contact: {
    type: Object,
    default: () => ({ name: '', phone: '', email: '' }),
  },
})
</script>

<template>
  <ContactCard class="card " style="overflow: hidden">
    <template #title>Name: {{props.contact?.name}}</template>
    <template #subtitle>Phone: {{props.contact?.phone}}</template>
    <template #content>Email: {{props.contact?.email}}</template>
  </ContactCard>
</template>

<style scoped>
.card{
  width: 100%;
  margin-left: 2rem;
}
</style>
