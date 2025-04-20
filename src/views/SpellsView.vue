<script setup lang="ts">
import { onMounted } from 'vue'
import Card from '@/volt/Card.vue'
import Button from '@/volt/Button.vue'
import InputText from '@/volt/InputText.vue'
import { useSpellsStore } from '../stores/spellsStore'
import Carousel from '@/components/Carousel.vue'
import type { Spell } from '@/types/wizardingWorldTypes'
import { useSpellsQuery } from '@/composables/useSpellsQuery'

const spellsStore = useSpellsStore()

onMounted(() => {
  document.title = 'Magical Spells'
  loadSpells()
})

function handleRetry() {
  loadSpells()
}

function loadSpells() {
  const { data, isLoading, error } = useSpellsQuery()

  // @ts-expect-error type error .value breaks this not sure why
  spellsStore.setSpells(isLoading, error, data ?? [])
}
</script>

<template>
  <div class="mx-auto md:px-4 py-8 max-w-7xl">
    <Card class="shadow-lg rounded-xl overflow-hidden">
      <template #title>
        <div class="flex items-center space-x-3">
          <font-awesome-icon icon="fa-bolt" class="text-primary" />
          <h1 class="text-2xl font-bold text-heading">Spells</h1>
        </div>
      </template>
      <template #content>
        <p class="text-text mb-6">Discover various spells from the wizarding world.</p>

        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-1">
            <InputText
              placeholder="Filter spells..."
              :value="spellsStore.getSpellFilter"
              @input="spellsStore.updateSpellFilter($event.target.value)"
              class="w-full"
            />
          </div>
          <Button label="Clear" @click="spellsStore.updateSpellFilter('')"></Button>
        </div>

        <div v-if="spellsStore.spells.loading" class="space-y-4">
          <div class="relative">
            <Carousel
              class="w-full"
              :columns="[
                { field: 'name', label: 'Name', sortable: true },
                { field: 'effect', label: 'Effect', sortable: true },
                { field: 'type', label: 'Type', sortable: true },
              ]"
              :data="Array(4).fill({})"
            >
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

        <div v-else-if="spellsStore.spells.error" class="p-4 bg-red-50 rounded-lg">
          <div class="text-red-600 font-medium mb-2">
            Error loading spells: {{ spellsStore.spells.error }}
          </div>
          <Button label="Retry" @click="handleRetry" icon="pi pi-refresh" class="p-button-sm" />
        </div>

        <div v-else>
          <Carousel
            :columns="[
              { field: 'name', label: 'Name', sortable: true },
              { field: 'incantation', label: 'Incantation', sortable: true },
              { field: 'effect', label: 'Effect', sortable: true },
              { field: 'type', label: 'Type', sortable: true },
            ]"
            :data="spellsStore.getSpells"
            row-key="id"
          >
            <template #name="{ row }">
              <div class="text-4xl text-text pb-4">
                {{ (row as Spell).name }}
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
                <h3 class="text-xl font-bold text-heading">Information</h3>
                <div class="py-1 text-text">
                  <b>Can be verbal: </b>{{ (row as Spell).canBeVerbal ? 'Yes' : 'No' }}
                </div>
                <div class="py-1 text-text"><b>Light: </b>{{ (row as Spell).light }}</div>
                <div class="py-1 text-text">
                  <b>Creator: </b>{{ (row as Spell).creator || 'Unknown' }}
                </div>
              </div>
            </template>
          </Carousel>
        </div>
      </template>
    </Card>
  </div>
</template>
