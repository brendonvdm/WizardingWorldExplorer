import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useHousesStore } from '../housesStore'
import { ref } from 'vue'
import { useHousesQuery } from '../../composables/useHousesQuery'

const mockHouses = [
  {
    id: '1',
    name: 'Gryffindor',
    houseColors: 'Scarlet and gold',
    founder: 'Godric Gryffindor',
    animal: 'Lion',
    element: 'Fire',
    ghost: 'Nearly-Headless Nick',
    commonRoom: 'Gryffindor Tower',
    heads: [
      { id: '1', firstName: 'Albus', lastName: 'Dumbledore' },
      { id: '2', firstName: 'Minerva', lastName: 'McGonagall' },
      { id: '3', firstName: 'Filius', lastName: 'Flitwick' },
      { id: '4', firstName: 'Pomfrey', lastName: 'Pomfrey' },
    ],
    traits: [
      { id: '1', name: 'Bold' },
      { id: '2', name: 'Courageous' },
      { id: '3', name: 'Loyal' },
      { id: '4', name: 'Brave' },
    ],
  },
  {
    id: '2',
    name: 'Slytherin',
    houseColors: 'Green and silver',
    founder: 'Salazar Slytherin',
    animal: 'Serpent',
    element: 'Water',
    ghost: 'Nearly-Headless Nick',
    commonRoom: 'Slytherin Tower',
    heads: [
      { id: '1', firstName: 'Salazar', lastName: 'Slytherin' },
      { id: '2', firstName: 'Severus', lastName: ' Snape' },
    ],
    traits: [
      { id: '1', name: 'Cunning' },
      { id: '2', name: 'Resourceful' },
      { id: '3', name: 'Ambitious' },
      { id: '4', name: 'Selfish' },
    ],
  },
]

vi.mock('../../composables/useHousesQuery', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as object),
    useHousesQuery: vi.fn(() => ({
      data: ref(mockHouses),
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

describe('housesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('initializes with empty state', () => {
    const store = useHousesStore()
    expect(store.houses.data).toEqual([])
    expect(store.houses.loading).toBe(false)
    expect(store.houses.error).toBeNull()
  })

  describe('actions', () => {
    it('loadHouses updates state with data', async () => {
      const store = useHousesStore()
      await store.setHouses(false, null, mockHouses)
      expect(store.houses.data).toEqual(mockHouses)
      expect(store.houses.loading).toBe(false)
      expect(store.houses.error).toBeNull()
    })

    it('handles error state when loading fails', async () => {
      // @ts-expect-error type error
      vi.mocked(useHousesQuery).mockImplementationOnce(mockErrorImplementation)
      const store = useHousesStore()
      await store.setHouses(false, new Error('Failed to load'), null)
      expect(store.houses.error).toStrictEqual(new Error('Failed to load'))
      expect(store.houses.data).toEqual([])
    })

    it('updates house filter', () => {
      const store = useHousesStore()
      store.updateHouseFilter('gryff')
      expect(store.houses.searchText).toBe('gryff')
    })
  })

  describe('getters', () => {
    it('filters houses by name', () => {
      const store = useHousesStore()
      store.houses.data = mockHouses
      store.updateHouseFilter('sly')
      expect(store.getHouses).toEqual([mockHouses[1]])
    })

    it('returns empty array when no matches found', () => {
      const store = useHousesStore()
      store.houses.data = mockHouses
      store.updateHouseFilter('nonexistent')
      expect(store.getHouses).toEqual([])
    })
  })
})
