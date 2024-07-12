import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import defaultAxios from '@/axios/axios'

export const useContactsStore = defineStore('searchStore', () => {
  const contacts = ref()

  const contactsInLocalStorage = localStorage.getItem('contacts')
  if (contactsInLocalStorage) {
    contacts.value = JSON.parse(contactsInLocalStorage)._value
  }

  watch(() => contacts, (state) => {
    localStorage.setItem('contacts', JSON.stringify(state))
  }, { deep: true })

  const fetchContacts = async () => {
    if (!contacts.value) {
      contacts.value = await defaultAxios('')
    }
  }
  const addContact = (newContact:object) => {
    contacts.value.unshift({ ...newContact })
  }
  const editContact = (newContact:object, selectedContact:object) => {
    for (const key in newContact) {
      selectedContact[key] = newContact[key]
    }
  }
  return {
    fetchContacts, contacts, addContact, editContact,
  }
})