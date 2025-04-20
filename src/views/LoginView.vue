<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <form class="rounded-lg shadow-lg p-8 w-96 text-text" @submit.prevent="login">
      <h1 class="text-3xl font-bold mb- text-header">Login</h1>
      <div class="mb-4">
        <label for="email" class="block mb-2">Email</label>
        <input type="email" id="email" v-model="email" class="w-full px-4 py-2 border rounded-lg" />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <button type="submit" class="bg-primary text-primary-contrast rounded-lg px-4 py-2 w-full">
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

async function login() {
  try {
    await userStore.login(email.value, password.value)
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}
</script>
