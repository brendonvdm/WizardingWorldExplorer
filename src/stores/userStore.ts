import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: ref(''),
    email: ref(''),
    isLogged: ref(false),
  }),
  actions: {
    login(name: string, email: string) {
      this.name = name
      this.email = email
      this.isLogged = true
    },
    logout() {
      this.name = ''
      this.email = ''
      this.isLogged = false
    },
  },
})
