import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useElixirsStore } from '../elixirsStore'
import type { Elixir } from '../../types/wizardingWorldTypes'
import { ref } from 'vue'
import * as useElixirsQuery from '../../composables/useElixirsQuery'

const mockElixirs: Elixir[] = [
  {
    id: '1',
    name: 'Draught of Peace',
    difficulty: 'Advanced',
    effect: 'Relieves anxiety and agitation',
    ingredients: [],
    sideEffects: 'None',
    characteristics: 'Blue smoke',
    time: '30 minutes',
  },
  {
    id: '2',
    name: 'Polyjuice Potion',
    difficulty: 'Advanced',
    effect: "Allows drinker to assume another person's appearance",
    ingredients: [],
    sideEffects: 'None',
    characteristics: 'Thick and mud-like',
    time: '1 month',
  },
]

// Mock the composable
vi.mock('../../composables/useElixirsQuery', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as object),
    useElixirsQuery: vi.fn(() => ({
      data: ref(mockElixirs),
      isLoading: ref(false),
      error: null,
      isSuccess: ref(true),
      status: ref('success'),
    })),
  }
})

describe('elixirsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('initializes with empty state', () => {
    const store = useElixirsStore()
    expect(store.elixirs.data).toEqual([])
    expect(store.elixirs.loading).toBe(false)
    expect(store.elixirs.error).toBeNull()
  })

  describe('actions', () => {
    it('setElixirs updates state with data', async () => {
      const store = useElixirsStore()
      await store.setElixirs(false, null, mockElixirs)
      expect(store.elixirs.data).toEqual(mockElixirs)
      expect(store.elixirs.loading).toBe(false)
      expect(store.elixirs.error).toBeNull()
    })

    it('handles error state when loading fails', async () => {
      const mockErrorImplementation = vi.fn(() => ({
        data: ref([]),
        isLoading: ref(false),
        error: ref(new Error('Failed to load')),
        isError: ref(true),
        status: ref('error'),
      }))
      // @ts-expect-error type error
      vi.mocked(useElixirsQuery.useElixirsQuery).mockImplementationOnce(mockErrorImplementation)

      const store = useElixirsStore()
      await store.setElixirs(false, new Error('Failed to load'), null)
      expect(store.elixirs.error).toStrictEqual(new Error('Failed to load'))
      expect(store.elixirs.data).toEqual([])
    })

    it('updates elixir filter', () => {
      const store = useElixirsStore()
      store.updateElixirFilter('peace')
      expect(store.elixirs.searchText).toBe('peace')
    })

    it('updates difficulty filter', () => {
      const store = useElixirsStore()
      store.updateDifficultyFilter('Advanced')
      expect(store.elixirs.difficultyFilter).toBe('Advanced')
    })
  })

  describe('getters', () => {
    it('filters elixirs by name', () => {
      const store = useElixirsStore()
      store.elixirs.data = mockElixirs
      store.updateElixirFilter('poly')
      expect(store.getElixirs).toEqual([mockElixirs[1]])
    })

    it('filters elixirs by difficulty', () => {
      const store = useElixirsStore()
      store.elixirs.data = mockElixirs
      store.updateDifficultyFilter('Advanced')
      expect(store.getElixirs).toEqual(mockElixirs)
    })

    it('returns empty array when no matches found', () => {
      const store = useElixirsStore()
      store.elixirs.data = mockElixirs
      store.updateElixirFilter('nonexistent')
      expect(store.getElixirs).toEqual([])
    })
  })
})
