import { queryOptions } from '@tanstack/react-query'
import { listUsers } from '~/server/user-functions'

export const usersQueryOptions = (page: number, pageSize: number) =>
  queryOptions({
    queryKey: ['users', page, pageSize],
    queryFn: () => listUsers({ data: { page, pageSize } })
  })
