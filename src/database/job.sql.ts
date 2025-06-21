import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const jobTable = sqliteTable('job', {
  id: text('id').primaryKey(),
  name: text('name').notNull()
})
