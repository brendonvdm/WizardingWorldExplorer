import { defineStore } from 'pinia'
import type { House } from '../types/wizardingWorldTypes'
import { ref } from 'vue'

type HouseType = {
  [key: string]: number
}

export const useHousesStore = defineStore('houses', {
  state: () => ({
    houses: {
      loading: ref(false as boolean),
      error: ref(null as Error | null),
      searchText: ref('' as string),
      data: ref([] as House[]),
    },
    housePoints: ref({
      gryffindor: 0,
      hufflepuff: 0,
      ravenclaw: 0,
      slytherin: 0,
    } as HouseType),
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
    getHousePoints: (state) => (name: string) => state.housePoints[name] ?? 0,
  },
  actions: {
    async setHouses(isLoading: boolean, error: Error | null, data: House[] | null) {
      this.houses.loading = isLoading
      this.houses.error = error ?? null
      this.houses.data = data ?? []
    },
    async setHousePointsFromLocalStorage() {
      const storedPoints = localStorage.getItem('housePoints')
      if (storedPoints) {
        try {
          this.housePoints = JSON.parse(storedPoints)
        } catch (error) {
          console.error('Failed to parse house points from localStorage:', error)
        }
      }
    },
    updateHouseFilter(filter: string) {
      this.houses.searchText = filter
    },
    addHousePoints(name: string, value: number) {
      this.housePoints[name] = (this.housePoints[name] ?? 0) + value

      localStorage.setItem('housePoints', JSON.stringify(this.housePoints))
    },
  },
})
