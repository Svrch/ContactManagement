<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ContactList from '@/components/ContactList.vue'
import { useContactsStore } from '@/stores/contactsStore'
import ContactItem from '@/components/ContactItem.vue'
import ContactForm from '@/components/ContactForm.vue'

const contactsStore = useContactsStore()
const selectedContact = ref({})

onMounted(async () => {
  await contactsStore.fetchContacts()
  selectedContact.value = contactsStore.contacts[0]
})

const deleteContact = (selectedCont: Object) => {
  contactsStore.contacts.splice(contactsStore.contacts.indexOf(selectedCont), 1)
  selectedContact.value = null
}

const addContact = (form:object) => {
  contactsStore.addContact({ ...form })
}

const editContact = (form:object) => {
  contactsStore.editContact(form, selectedContact.value)
}
</script>

<template>
  <div class="flex">
    <div>
      <ContactList :contacts="contactsStore.contacts" v-model="selectedContact"></ContactList>
    </div>
    <ContactItem :contact="selectedContact"></ContactItem>
  </div>
  <div class="w-14rem flex items-center justify-content-center my-3 gap-2">
    <ContactForm  @submitForm="addContact"/>
    <ContactForm :contactToEdit="selectedContact" @submitForm="editContact" />
    <Button
      :disabled="!selectedContact"
      icon="pi pi-user-minus"
      @click="deleteContact(selectedContact)"
    ></Button>
  </div>
</template>
