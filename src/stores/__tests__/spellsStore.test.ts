import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSpellsStore } from '../spellsStore'
import type { Spell } from '../../types/wizardingWorldTypes'
import { ref } from 'vue'
import * as useSpellsQuery from '../../composables/useSpellsQuery'

const mockSpells: Spell[] = [
  {
    id: '1',
    name: 'Expelliarmus',
    incantation: 'Expelliarmus',
    effect: 'Disarms opponent',
    canBeVerbal: true,
    type: 'Charm',
    light: 'Red',
    creator: 'Unknown',
  },
  {
    id: '2',
    name: 'Lumos',
    incantation: 'Lumos',
    effect: 'Creates light at wand tip',
    canBeVerbal: true,
    type: 'Charm',
    light: 'White',
    creator: 'Unknown',
  },
]

vi.mock('../../composables/useSpellsQuery', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as object),
    useSpellsQuery: vi.fn(() => ({
      data: ref(mockSpells),
      isLoading: ref(false),
      error: null,
      isSuccess: ref(true),
      status: ref('success'),
    })),
  }
})

const mockErrorImplementation = vi.fn(() => ({
  data: ref([]),
  isLoading: ref(false),
  error: ref(new Error('Failed to load')),
  isError: ref(true),
  status: ref('error'),
}))

describe('spellsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('initializes with empty state', () => {
    const store = useSpellsStore()
    expect(store.spells.data).toEqual([])
    expect(store.spells.loading).toBe(false)
    expect(store.spells.error).toBeNull()
  })

  describe('actions', () => {
    it('setSpells updates state with data', async () => {
      const store = useSpellsStore()
      await store.setSpells(false, null, mockSpells)
      expect(store.spells.data).toEqual(mockSpells)
      expect(store.spells.loading).toBe(false)
      expect(store.spells.error).toBeNull()
    })

    it('handles error state when loading fails', async () => {
      // @ts-expect-error type error
      vi.mocked(useSpellsQuery.useSpellsQuery).mockImplementationOnce(mockErrorImplementation)
      const store = useSpellsStore()
      await store.setSpells(false, new Error('Failed to load'), null)
      expect(store.spells.error).toStrictEqual(new Error('Failed to load'))
      expect(store.spells.data).toEqual([])
    })

    it('updates spell filter', () => {
      const store = useSpellsStore()
      store.updateSpellFilter('expel')
      expect(store.spells.searchText).toBe('expel')
    })
  })

  describe('getters', () => {
    it('filters spells by name', () => {
      const store = useSpellsStore()
      store.spells.data = mockSpells
      store.updateSpellFilter('lum')
      expect(store.getSpells).toEqual([mockSpells[1]])
    })

    it('returns empty array when no matches found', () => {
      const store = useSpellsStore()
      store.spells.data = mockSpells
      store.updateSpellFilter('nonexistent')
      expect(store.getSpells).toEqual([])
    })
  })
})
