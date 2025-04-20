import { useQuery } from '@tanstack/vue-query'
import type { Elixir } from '../types/wizardingWorldTypes'
import { experimental_createPersister } from '@tanstack/query-persist-client-core'

export function useElixirsQuery() {
  return useQuery<Elixir[]>({
    queryKey: ['elixirs'],
    queryFn: async () => {
      const response = await fetch('https://wizard-world-api.herokuapp.com/Elixirs')
      if (!response.ok) {
        throw new Error('Failed to fetch elixirs')
      }
      return response.json()
    },
    persister: experimental_createPersister({
      storage: localStorage,
    }),
    staleTime: 5000000,
  })
}
