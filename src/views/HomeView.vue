<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/volt/Card.vue'
import Button from '@/volt/Button.vue'
const router = useRouter()

const menuCards = ref([
  {
    title: 'Houses',
    description: 'Explore the different houses of the wizarding world.',
    icon: 'fa-hat-wizard',
    route: '/houses',
    color: 'bg-primary',
    visible: false,
  },
  {
    title: 'Spells',
    description: 'Discover various spells from the wizarding world.',
    icon: 'fa-bolt',
    route: '/spells',
    color: 'bg-primary',
    visible: false,
  },
  {
    title: 'Elixirs',
    description: 'Explore magical elixirs and potions from the wizarding world.',
    icon: 'fa-flask',
    route: '/elixirs',
    color: 'bg-primary',
    visible: false,
  },
])

const navigateTo = (route: string) => {
  router.push(route)
}
</script>

<template>
  <main class="py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-heading">
          Welcome to the <span class="text-primary">Wizarding World</span>
        </h1>
        <p class="text-lg sm:text-xl text-text max-w-3xl mx-auto">
          Explore the magical universe through our interactive catalog
        </p>
      </div>

      <div class="flex flex-row flex-wrap gap-6 sm:gap-8 lg:gap-10 justify-center">
        <template v-for="(card, index) in menuCards" :key="index">
          <Card
            class="w-full min-w-xs max-w-xs cursor-pointer overflow-hidden"
            @click="navigateTo(card.route)"
          >
            <template #header>
              <div
                :class="[card.color, 'h-36 sm:h-40 flex items-center justify-center text-white']"
              >
                <font-awesome-icon :icon="['fa-solid', card.icon]" class="text-5xl sm:text-6xl" />
              </div>
            </template>
            <template #title>
              <div class="text-xl sm:text-2xl font-bold px-2 text-heading">{{ card.title }}</div>
            </template>
            <template #content>
              <p class="mb-4 flex-grow px-2 text-text">{{ card.description }}</p>
            </template>
            <template #footer>
              <div class="flex justify-end pt-2 px-2">
                <Button
                  class="flex items-center !text-primary-contrast"
                  onclick="navigateTo(card.route)"
                >
                  Explore <font-awesome-icon icon="fa-arrow-right" class="ml-2" />
                </Button>
              </div>
            </template>
          </Card>
        </template>
      </div>
    </div>

    <div id="app-status" v-if="false"></div>
  </main>
</template>
