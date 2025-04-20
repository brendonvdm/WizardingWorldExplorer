import { defineStore } from 'pinia'
import type { House } from '../types/wizardingWorldTypes'
import { ref } from 'vue'

export const useHousesStore = defineStore('houses', {
  state: () => ({
    houses: {
      loading: ref(false as boolean),
      error: ref(null as Error | null),
      searchText: ref('' as string),
      data: ref([] as House[]),
    },
  }),
  getters: {
    getHouses: (state) =>
      state.houses.data.filter((h) =>
        h.name.toLowerCase().includes(state.houses.searchText.toLowerCase()),
      ),
    getHouseState: (state) => ({
      error: state.houses.error,
      loading: state.houses.loading,
    }),
    getHouseFilter: (state) => state.houses.searchText,
  },
  actions: {
    async setHouses(isLoading: boolean, error: Error | null, data: House[] | null) {
      this.houses.loading = isLoading
      this.houses.error = error ?? null
      this.houses.data = data ?? []
    },
    updateHouseFilter(filter: string) {
      this.houses.searchText = filter
    },
  },
})
