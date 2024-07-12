<script setup lang="ts">
const props = defineProps({
  contacts: {
    type: Object,
  },
})

const selectedContact = defineModel()
</script>

<template>
  <ListBox
    v-model="selectedContact"
    :options="props.contacts"
    filter
    optionLabel="name"
    class=""
    scrollHeight="30rem"
  />
</template>
