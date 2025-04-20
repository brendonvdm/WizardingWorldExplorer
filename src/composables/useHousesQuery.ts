import { useQuery } from '@tanstack/vue-query'
import type { House } from '../types/wizardingWorldTypes'
import { experimental_createPersister } from '@tanstack/query-persist-client-core'

export function useHousesQuery() {
  return useQuery<House[]>({
    queryKey: ['houses'],
    queryFn: async () => {
      const response = await fetch('https://wizard-world-api.herokuapp.com/Houses')
      if (!response.ok) {
        throw new Error('Failed to fetch houses')
      }
      return response.json()
    },
    persister: experimental_createPersister({
      storage: localStorage,
    }),
    staleTime: 5000000,
  })
}
