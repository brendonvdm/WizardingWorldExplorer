import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faBuilding,
  faBolt,
  faFlask,
  faArrowRight,
  faEye,
  faMoon,
  faSun,
  faSpinner,
  faPencil,
  faHatWizard,
  faHouse,
  faArrowLeft,
  faUser,
  faStar,
  faPaw,
  faPalette,
} from '@fortawesome/free-solid-svg-icons'
library.add([
  faHome,
  faBuilding,
  faBolt,
  faFlask,
  faArrowRight,
  faArrowLeft,
  faEye,
  faMoon,
  faSun,
  faSpinner,
  faPencil,
  faHatWizard,
  faHouse,
  faUser,
  faStar,
  faPaw,
  faPalette,
])

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/userStore'

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLogged) {
    next({ name: 'login' })
  } else {
    next()
  }
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue, {
  unstyled: true,
})
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
