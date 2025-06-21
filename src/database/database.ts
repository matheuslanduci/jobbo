import * as SqliteDrizzle from '@effect/sql-drizzle/Sqlite'
import { SqliteClient } from '@effect/sql-sqlite-bun'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Layer } from 'effect'
import { serverEnv } from '~/lib/server-env'

export const SqlLive = SqliteClient.layer({
  filename: serverEnv.DATABASE_PATH
})

export const DrizzleLive = SqliteDrizzle.layer.pipe(Layer.provide(SqlLive))

export const DatabaseLive = Layer.mergeAll(SqlLive, DrizzleLive)

/**
 * BetterAuth is not compatible with Effect, so we need a `drizzle` basic
 * instance.
 *
 * @deprecated
 * Use `DatabaseLive` instead.
 */
export const db = drizzle(serverEnv.DATABASE_PATH)
