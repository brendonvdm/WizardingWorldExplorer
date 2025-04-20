import { useQuery } from '@tanstack/vue-query'
import type { Spell } from '../types/wizardingWorldTypes'
import { experimental_createPersister } from '@tanstack/query-persist-client-core'

export function useSpellsQuery() {
  return useQuery<Spell[]>({
    queryKey: ['spells'],
    queryFn: async () => {
      const response = await fetch('https://wizard-world-api.herokuapp.com/Spells')
      if (!response.ok) {
        throw new Error('Failed to fetch spells')
      }
      return response.json()
    },
    persister: experimental_createPersister({
      storage: localStorage,
    }),
    staleTime: 5000000,
  })
}
