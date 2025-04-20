<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import Toolbar from 'primevue/toolbar'
import Select from '@/volt/Select.vue'

const items = ref([
  {
    label: 'Home',
    icon: 'fa-hat-wizard',
    to: '/',
  },
  {
    label: 'Houses',
    icon: 'fa-building',
    to: '/houses',
  },
  {
    label: 'Spells',
    icon: 'fa-bolt',
    to: '/spells',
  },
  {
    label: 'Elixirs',
    icon: 'fa-flask',
    to: '/elixirs',
  },
])

const houses = ref([
  { label: 'Gryffindor', value: 'gryffindor' },
  { label: 'Slytherin', value: 'slytherin' },
  { label: 'Ravenclaw', value: 'ravenclaw' },
  { label: 'Hufflepuff', value: 'hufflepuff' },
])

const selectedHouse = ref(localStorage.getItem('hogwartsHouse') || 'gryffindor')
const isDarkMode = ref(
  localStorage.getItem('darkMode') === 'true' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches,
)

function applyTheme() {
  const root = document.body
  // Remove existing house classes
  houses.value.forEach((h) => root.classList.remove('house-' + h.value))
  root.classList.add('house-' + selectedHouse.value)
  if (isDarkMode.value) {
    root.classList.add('app-dark')
    root.classList.remove('app-light')
  } else {
    root.classList.remove('app-dark')
    root.classList.add('app-light')
  }
}

onMounted(() => {
  applyTheme()
})

watch(selectedHouse, (newVal) => {
  localStorage.setItem('hogwartsHouse', newVal)
  applyTheme()
})

watch(isDarkMode, (newVal) => {
  localStorage.setItem('darkMode', newVal ? 'true' : 'false')
  applyTheme()
})
</script>

<template>
  <div class="app-container relative">
    <Toolbar
      pt:root="rounded-none md:rounded-full p-4 bg-primary flex justify-between items-center z-50 sticky top-0"
    >
      <template #start>
        <div class="flex items-center gap-2">
          <router-link
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            class="p-menuitem-link"
            v-slot="{ href, navigate, isActive }"
          >
            <a
              :href="href"
              @click="navigate"
              :class="[isActive ? 'router-link-active font-extrabold' : '']"
              class="text-primary-contrast px-2"
            >
              <font-awesome-icon v-if="item.icon" :icon="['fa-solid', item.icon]" class="mr-2" />
              <span class="p-menuitem-text">{{ item.label }}</span>
            </a>
          </router-link>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-4 text-primary-contrast">
          <div class="card flex justify-center">
            <Select
              v-model="selectedHouse"
              :options="houses"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a House"
              class="!bg-primary !text-primary-contrast border-none"
              overlay-class="!bg-primary !text-primary-contrast border-none shadow-none"
              label-class="!text-primary-contrast"
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2 text-primary-contrast">
                  <div>{{ slotProps.option.label }}</div>
                </div>
              </template>
            </Select>
          </div>
          <button @click="isDarkMode = !isDarkMode" :aria-pressed="isDarkMode" class="theme-toggle">
            <font-awesome-icon v-if="isDarkMode" :icon="['fa-solid', 'fa-moon']" />
            <font-awesome-icon v-else :icon="['fa-solid', 'fa-sun']" />
          </button>
        </div>
      </template>
    </Toolbar>

    <main
      class="mx-auto py-8 md:px-4 bg-background -mt-10 pt-10 relative z-0 max-h-[calc(96vh)] md:max-h-[calc(90vh)] md:rounded-b-lg overflow-y-auto"
      style="scrollbar-width: thin; scrollbar-color: var(--color-primary) transparent"
    >
      <router-view v-slot="{ Component, route }">
        <transition name="fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 2s ease,
    transform 2s ease;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100vh);
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(50vh);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(-100vh);
}
</style>
