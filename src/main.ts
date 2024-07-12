import './assets/main.css'
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'

import Listbox from 'primevue/listbox'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import 'primeflex/primeflex.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.component('ListBox', Listbox)
app.component('ContactCard', Card)
app.component('ModalForm', Dialog)
app.component('InputText', InputText)
app.component('Button', Button)

app.mount('#app')
