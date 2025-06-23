import * as SqliteDrizzle from '@effect/sql-drizzle/Sqlite'
import { count } from 'drizzle-orm'
import { gen, Service, tryPromise } from 'effect/Effect'
import { DatabaseLive } from '~/database/database'
import { userTable } from '~/database/user.sql'
import { DatabaseError } from '~/errors/database-errors'

export class UserService extends Service<UserService>()('UserService', {
  accessors: true,
  effect: gen(function* () {
    const db = yield* SqliteDrizzle.SqliteDrizzle

    const getUsers = (page: number, pageSize: number) =>
      tryPromise({
        try: () =>
          db
            .select()
            .from(userTable)
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .execute(),
        catch: (error) =>
          new DatabaseError({
            cause: error,
            message: 'Failed to fetch users'
          })
      })

    const countUsers = () =>
      tryPromise({
        try: () =>
          db
            .select({
              count: count()
            })
            .from(userTable)
            .execute(),
        catch: (error) =>
          new DatabaseError({
            cause: error,
            message: 'Failed to count users'
          })
      })

    return { getUsers, countUsers } as const
  }),
  dependencies: [DatabaseLive]
}) {}
