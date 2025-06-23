import { createServerFn } from '@tanstack/react-start'
import { Effect } from 'effect'
import { standardSchemaV1 } from 'effect/Schema'
import { PaginationParams } from '~/lib/pagination'
import { ServerRuntime } from '~/lib/server-runtime'
import { UserService } from '~/services/user-service'
import { adminMiddleware } from './auth-functions'

export const listUsers = createServerFn()
  .validator(standardSchemaV1(PaginationParams))
  .middleware([adminMiddleware])
  .handler(async ({ data }) => {
    const result = await ServerRuntime.runPromise(
      Effect.all(
        [
          UserService.getUsers(data.page, data.pageSize),
          UserService.countUsers()
        ],
        {
          concurrency: 'unbounded'
        }
      )
    )

    return {
      users: result[0],
      total: result[1][0]?.count ?? 0
    }
  })
