import { defineStore } from 'pinia'
import type { Spell } from '../types/wizardingWorldTypes'
import { ref } from 'vue'

export const useSpellsStore = defineStore('spells', {
  state: () => ({
    spells: {
      loading: ref(false as boolean),
      error: ref(null as Error | null),
      searchText: ref('' as string),
      data: ref([] as Spell[]),
    },
  }),
  getters: {
    getSpells: (state) =>
      state.spells.data.filter((s) =>
        s.name.toLowerCase().includes(state.spells.searchText.toLowerCase()),
      ),
    getSpellState: (state) => ({
      error: state.spells.error,
      loading: state.spells.loading,
    }),
    getSpellFilter: (state) => state.spells.searchText,
  },
  actions: {
    async setSpells(isLoading: boolean, error: Error | null, data: Spell[] | null) {
      this.spells.loading = isLoading
      this.spells.error = error ?? null
      this.spells.data = data ?? []
    },
    updateSpellFilter(filter: string) {
      this.spells.searchText = filter
    },
  },
})
