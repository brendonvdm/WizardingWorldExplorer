import { defineStore } from 'pinia'
import type { Elixir } from '../types/wizardingWorldTypes'
import { ref } from 'vue'

export const useElixirsStore = defineStore('elixirs', {
  state: () => ({
    elixirs: {
      loading: ref(false as boolean),
      error: ref(null as Error | null),
      searchText: ref('' as string),
      difficultyFilter: ref('' as string),
      data: ref([] as Elixir[]),
    },
  }),
  getters: {
    getElixirs: (state) =>
      state.elixirs.data
        .filter((e) => e.name.toLowerCase().includes(state.elixirs.searchText.toLowerCase()))
        .filter(
          (e) =>
            state.elixirs.difficultyFilter === '' ||
            e.difficulty === state.elixirs.difficultyFilter,
        ),
    getElixirState: (state) => ({
      error: state.elixirs.error,
      loading: state.elixirs.loading,
      difficultyFilter: state.elixirs.difficultyFilter,
    }),
    getElixirFilter: (state) => state.elixirs.searchText,
    getDifficultyFilter: (state) => state.elixirs.difficultyFilter,
  },
  actions: {
    async setElixirs(isLoading: boolean, error: Error | null, data: Elixir[] | null) {
      this.elixirs.loading = isLoading
      this.elixirs.error = error
      this.elixirs.data = data ?? []
    },
    updateElixirFilter(filter: string) {
      this.elixirs.searchText = filter
    },
    updateDifficultyFilter(difficulty: string) {
      this.elixirs.difficultyFilter = difficulty
    },
  },
})
