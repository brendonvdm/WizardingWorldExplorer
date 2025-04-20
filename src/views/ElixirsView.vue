<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Card from '@/volt/Card.vue'
import Button from '@/volt/Button.vue'
import InputText from '@/volt/InputText.vue'
import { useElixirsStore } from '@/stores/elixirsStore'

import Select from '@/volt/Select.vue'
import Carousel from '@/components/Carousel.vue'
import type { Elixir } from '@/types/wizardingWorldTypes'
import { useElixirsQuery } from '@/composables/useElixirsQuery'

const elixirsStore = useElixirsStore()

const difficultiesOptions = ref([{ label: 'All', value: '' }])

const tableColumns = [
  { field: 'name', label: 'Name', sortable: true },
  { field: 'effect', label: 'Effect', sortable: true },
  { field: 'sideEffects', label: 'Side Effects', sortable: true },
  { field: 'characteristics', label: 'Characteristics', sortable: true },
  { field: 'time', label: 'Time', sortable: true },
  { field: 'difficulty', label: 'Difficulty', sortable: true },
]

watch(
  () => elixirsStore.elixirs.data,
  () => {
    if (!elixirsStore.elixirs.data) return
    difficultiesOptions.value = [
      { label: 'All', value: '' },
      ...Array.from(new Set(elixirsStore.elixirs.data.map((e) => e.difficulty))).map((d) => ({
        label: d,
        value: d,
      })),
    ]
  },
  { immediate: true },
)

onMounted(() => {
  document.title = 'Magical Elixirs'
  loadElixirs()
})

function handleRetry() {
  loadElixirs()
}

function loadElixirs() {
  const { data, isLoading, error } = useElixirsQuery()
  // @ts-expect-error type error .value breaks this not sure why
  elixirsStore.setElixirs(isLoading, error, data ?? [])
}
</script>

<template>
  <div class="mx-auto md:px-4 py-8 max-w-7xl">
    <Card class="shadow-lg rounded-xl overflow-hidden">
      <template #title>
        <div class="flex items-center space-x-3">
          <font-awesome-icon icon="fa-flask" class="text-primary" />
          <h1 class="text-2xl font-bold text-heading">Magical Elixirs</h1>
        </div>
      </template>
      <template #content>
        <p class="text-text mb-6">Explore magical elixirs and potions from the wizarding world.</p>

        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-1">
            <InputText
              placeholder="Filter elixirs..."
              :value="elixirsStore.getElixirFilter"
              @input="elixirsStore.updateElixirFilter($event.target.value)"
              class="w-full"
            />
          </div>
          <Button label="Clear" @click="elixirsStore.updateElixirFilter('')"></Button>
        </div>
        <div class="filter-item">
          <label for="difficulty-filter" class="text-text">Filter by difficulty</label>
          <Select
            :options="difficultiesOptions"
            optionLabel="label"
            optionValue="value"
            :value="elixirsStore.getDifficultyFilter"
            @change="(selected) => elixirsStore.updateDifficultyFilter(selected.value)"
            class="w-full bg-background text-text"
            overlayClass="bg-primary text-primary-contrast"
          ></Select>
        </div>

        <p class="mb-4 text-text">Explore magical elixirs and potions from the wizarding world.</p>

        <div v-if="elixirsStore.elixirs.loading" class="space-y-4">
          <div class="relative">
            <Carousel class="w-full" :columns="tableColumns" :data="Array(4).fill({})">
              <template #loading>
                <tr v-for="i in 4" :key="i" class="">
                  <td class="px-4 py-2 border-b">{{ '...' }}</td>
                  <td class="px-4 py-2 border-b">{{ '&nbsp;' }}</td>
                  <td class="px-4 py-2 border-b">{{ '&nbsp;' }}</td>
                </tr>
              </template>
            </Carousel>
            <div class="absolute top-0 left-0 w-full h-full">
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <font-awesome-icon icon="fa-spinner" class="text-primary text-6xl animate-spin" />
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="elixirsStore.elixirs.error" class="p-4 bg-red-50 rounded-lg">
          <div class="text-red-600 font-medium mb-2">
            Error loading elixirs: {{ elixirsStore.elixirs.error }}
          </div>
          <Button label="Retry" @click="handleRetry" icon="pi pi-refresh" class="p-button-sm" />
        </div>

        <div v-else class="elixir-grid">
          <Carousel :columns="tableColumns" :data="elixirsStore.getElixirs" row-key="id">
            <template #name="{ row }">
              <div class="text-4xl text-text pb-4">
                {{ (row as Elixir).name }}
              </div>
            </template>
            <template #image>
              <div class="flex items-center h-full">
                <img
                  src="https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png"
                  alt=""
                  class="w-full"
                />
              </div>
            </template>

            <template #details="{ row }">
              <div class="mt-4 p-4 border rounded text-text">
                <h3 class="text-xl font-bold text-heading">Ingredients</h3>
                <div>
                  <template v-if="(row as Elixir)?.ingredients?.length ?? 0 > 0">
                    <div
                      v-for="(ingredient, index) in (row as Elixir).ingredients"
                      :key="index"
                      class="py-1 text-text"
                    >
                      {{ ingredient.name }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="py-1 text-text">Unknown ingredients</div>
                  </template>
                </div>
                <h3 class="text-xl font-bold text-heading">Inventors</h3>
                <div>
                  <template v-if="(row as Elixir)?.inventors?.length ?? 0 > 0">
                    <div
                      v-for="(inventor, index) in (row as Elixir).inventors"
                      :key="index"
                      class="py-1 text-text"
                    >
                      {{ inventor.firstName }} {{ inventor.lastName }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="py-1 text-text">Unknown inventors</div>
                  </template>
                </div>
                <h3 class="text-xl font-bold text-heading">Manufacturer</h3>
                <div v-if="(row as Elixir).manufacturer" class="py-1 text-text">
                  {{ (row as Elixir).manufacturer }}
                </div>
                <div v-else class="py-1 text-text">Unknown manufacturer</div>
              </div>
            </template>
          </Carousel>
        </div>
      </template>
    </Card>
  </div>
</template>
