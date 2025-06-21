/**
 * This table is managed by Better-Auth.
 */

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { userTable } from './user.sql'

export const sessionTable = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by')
})
