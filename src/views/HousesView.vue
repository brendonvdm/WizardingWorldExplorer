<script setup lang="ts">
import { onMounted } from 'vue'
import Card from '@/volt/Card.vue'
import Button from '@/volt/Button.vue'
import InputText from '@/volt/InputText.vue'
import { useHousesStore } from '../stores/housesStore'
import Carousel from '@/components/Carousel.vue'
import type { House } from '@/types/wizardingWorldTypes'
import { useHousesQuery } from '@/composables/useHousesQuery'

const housesStore = useHousesStore()

const tableColumns = [
  { label: 'Name', field: 'name' },
  { label: 'Founder', field: 'founder' },
  { label: 'Animal', field: 'animal' },
  { label: 'Element', field: 'element' },
  { label: 'Ghost', field: 'ghost' },
  { label: 'Common Room', field: 'commonRoom' },
]

onMounted(() => {
  document.title = 'Hogwarts Houses'
  loadHouses()
  housesStore.setHousePointsFromLocalStorage()
})

function handleRetry() {
  loadHouses()
}

function loadHouses() {
  const { data, isLoading, error } = useHousesQuery()

  // @ts-expect-error type error .value breaks this not sure why
  housesStore.setHouses(isLoading, error, data ?? [])
}
</script>

<template>
  <div class="mx-auto md:px-4 py-8 max-w-7xl">
    <Card class="shadow-lg rounded-xl overflow-hidden">
      <template #title>
        <div class="flex items-center space-x-3">
          <font-awesome-icon icon="fa-hat-wizard" class="text-primary" />

          <h1 class="text-2xl font-bold text-heading">Hogwarts Houses</h1>
        </div>
      </template>
      <template #content>
        <p class="text-text mb-6">Explore the different houses of the wizarding world.</p>

        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-1">
            <InputText
              placeholder="Filter houses..."
              :value="housesStore.getHouseFilter"
              @input="housesStore.updateHouseFilter($event.target.value)"
              class="w-full"
            />
          </div>
          <Button label="Clear" @click="housesStore.updateHouseFilter('')"></Button>
        </div>

        <div v-if="housesStore.getHouseState.loading" class="space-y-4">
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

        <div v-else-if="housesStore.getHouseState.error" class="bg-red-50 p-4 rounded-lg">
          <div class="text-red-600 font-medium mb-2">
            Error loading houses: {{ housesStore.getHouseState.error }}
          </div>
          <Button label="Retry" @click="handleRetry" icon="pi pi-refresh" class="p-button-sm" />
        </div>

        <Carousel v-else :columns="tableColumns" :data="housesStore.getHouses" row-key="id">
          <template #name="{ row }">
            <div class="text-4xl text-text pb-4">
              <div>{{ (row as House).name }}</div>
              <div
                class="inline-block px-3 py-1 font-semibold rounded-full m-2"
                :class="(row as House).name.toLowerCase()"
              >
                {{ housesStore.getHousePoints((row as House).name) }}
              </div>
              <div class="flex gap-4 text-sm">
                <Button
                  label="Add 10 Points"
                  @click="housesStore.addHousePoints((row as House).name, 10)"
                  class="p-button-sm"
                ></Button>
                <Button
                  label="Deduct 10 points"
                  @click="housesStore.addHousePoints((row as House).name, -10)"
                  class="p-button-sm"
                ></Button>
              </div>
            </div>
          </template>
          <template #image="{ row }">
            <div class="flex items-center h-full">
              <img
                v-if="(row as House).name === 'Gryffindor'"
                src="https://contentful.harrypotter.com/usf1vwtuqyxm/4PcgKT3VHNAUTvf7kXkdrD/2093bb06b6a9e6e74129f13c0c639932/Filled-Gryffindor.svg"
                alt=""
                class="w-full"
              />
              <img
                v-if="(row as House).name === 'Hufflepuff'"
                src="https://contentful.harrypotter.com/usf1vwtuqyxm/1Et1EKQhLsGiql1ZlbHShw/79b58fe13d156833a808c82b085bedfe/Filled-Hufflepuff.svg"
                alt=""
                class="w-full"
              />
              <img
                v-if="(row as House).name === 'Slytherin'"
                src="https://contentful.harrypotter.com/usf1vwtuqyxm/1dUgeiYSumqjTF6m8BWP1u/aa4d596be495975136ce08fe14a63e7b/Filled-Slytherin.svg"
                alt=""
                class="w-full"
              />
              <img
                v-if="(row as House).name === 'Ravenclaw'"
                src="https://contentful.harrypotter.com/usf1vwtuqyxm/17xo05yCVo3tetTYhsgAvG/8963643ef613a74abc40a72548ddb953/Filled-Ravenclaw.svg"
                alt=""
                class="w-full"
              />
            </div>
          </template>
          <template #details="{ row }">
            <div class="mt-4 p-4 border rounded text-text">
              <h3 class="text-xl font-bold text-heading">Heads</h3>
              <div>
                <template v-if="(row as House).heads.length > 0">
                  <div
                    v-for="(head, index) in (row as House).heads"
                    :key="index"
                    class="py-1 text-text"
                  >
                    {{ head.firstName }} {{ head.lastName }}
                  </div>
                </template>
                <template v-else>
                  <div class="py-1 text-text">Unknown heads</div>
                </template>
              </div>
              <h3 class="text-xl font-bold text-heading">Traits</h3>
              <div>
                <template v-if="(row as House).traits.length > 0">
                  <div
                    v-for="(trait, index) in (row as House).traits"
                    :key="index"
                    class="py-1 text-text"
                  >
                    {{ trait.name }}
                  </div>
                </template>
                <template v-else>
                  <div class="py-1 text-text">Unknown traits</div>
                </template>
              </div>
            </div>
          </template>
        </Carousel>
      </template>
    </Card>
  </div>
</template>

<style>
/* House-specific colors */
.gryffindor {
  background-color: #e74c3c;
  color: #ffffff;
}
.hufflepuff {
  background-color: #f1c40f;
  color: #ffffff;
}
.slytherin {
  background-color: #27ae60;
  color: #ffffff;
}
.ravenclaw {
  background-color: #3498db;
  color: #ffffff;
}

.gryffindor-text {
  color: #e74c3c;
}
.hufflepuff-text {
  color: #f1c40f;
}
.slytherin-text {
  color: #27ae60;
}
.ravenclaw-text {
  color: #3498db;
}

.gryffindor-border {
  border-color: #d43b2a;
}

.hufflepuff-border {
  border-color: #d7a413;
}

.slytherin-border {
  border-color: #219653;
}

.ravenclaw-border {
  border-color: #2978b5;
}
</style>
