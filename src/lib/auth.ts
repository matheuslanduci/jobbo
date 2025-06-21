import { queryOptions } from '@tanstack/react-query'
import { authClient } from '~/lib/client-auth'

export const currentSessionQueryOptions = () =>
  queryOptions({
    queryKey: ['currentSession'],
    queryFn: async () => {
      const { data, error } = await authClient.getSession()

      if (error) {
        throw error
      }

      return data
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false
  })
