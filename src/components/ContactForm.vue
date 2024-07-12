<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  minLength, numeric, email,
} from '@vuelidate/validators'

const formName = ref('')
const formPhone = ref('')
const formEmail = ref('')

const props = defineProps({
  contactToEdit: {
    type: Object,
  },
})

watch(props, () => {
  formName.value = props.contactToEdit?.name
  formPhone.value = props.contactToEdit?.phone
  formEmail.value = props.contactToEdit?.email
})

const rules = computed(() => ({
  formName: {
    minLength: minLength(5),
  },
  formPhone: {
    numeric,
  },
  formEmail: {
    email,
  },
}))

const v = useVuelidate(rules, { formName, formPhone, formEmail })

const iconToShow = () => {
  if (props.contactToEdit === undefined) {
    return 'pi pi-user-plus'
  } return 'pi pi-user-edit'
}

const labelToShow = () => {
  if (props.contactToEdit === undefined) {
    return 'Create new contact.'
  } return 'Update contact information.'
}

const emit = defineEmits(['submitForm'])

const clearForm = () => {
  formName.value = ''
  formEmail.value = ''
  formPhone.value = ''
}
const errorToShow = ref('')
const visible = ref(false)

const closeForm = () => {
  visible.value = false
  errorToShow.value = ''
  clearForm()
}

const submitForm = () => {
  visible.value = false
  emit('submitForm', { name: formName.value, phone: formPhone.value, email: formEmail.value })
  clearForm()
}
</script>

<template>
  <Button
    :icon="iconToShow()"
    @click="visible = true"
    :disabled="props.contactToEdit === null"
  />

  <ModalForm
    v-model:visible="visible"
    modal
    header="Edit Contact"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-4">{{labelToShow()}}</span>
    <div class="flex items-center gap-4">
      <label for="Name" class="font-semibold w-24 flex align-items-center">Name</label>
      <InputText
        id="Name"
        class="flex-auto "
        autocomplete="off"
        v-model="formName"
      />
    </div>
    <div class="mb-4">{{v.formName.$silentErrors[0]?.$message}}</div>
    <div class="flex items-center gap-4">
      <label for="Phone" class="font-semibold w-24 flex align-items-center">Phone</label>
      <InputText
        id="Phone"
        class="flex-auto"
        autocomplete="off"
        v-model="formPhone"
      />
    </div>
    <div class="mb-4">{{v.formPhone.$silentErrors[0]?.$message}}</div>
    <div class="flex items-center gap-4">
      <label for="Email" class="font-semibold w-24 flex align-items-center">Email</label>
      <InputText
        id="Email"
        class="flex-auto"
        autocomplete="off"
        v-model="formEmail"
      />
    </div>
    <div class="mb-4">{{v.formEmail.$silentErrors[0]?.$message}}</div>
    <span class="block mb-4 ">{{errorToShow}}</span>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Save"
        @click="submitForm"
        :disabled="v.$silentErrors.length !== 0 || formName===''
          || formPhone==='' || formEmail==='' "
      ></Button>
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="closeForm"
      ></Button>
    </div>
  </ModalForm>
</template>
