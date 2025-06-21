/**
 * This table is managed by Better-Auth.
 */

import { createInsertSchema } from '@handfish/drizzle-effect'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' })
    .$defaultFn(() => !1)
    .notNull(),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  role: text('role'),
  banned: integer('banned', { mode: 'boolean' }),
  banReason: text('ban_reason'),
  banExpires: integer('ban_expires', { mode: 'timestamp' }),
  isAnonymous: integer('is_anonymous', { mode: 'boolean' })
})

export const newUserSchema = createInsertSchema(userTable)

export type User = typeof userTable.$inferSelect
export type NewUser = typeof userTable.$inferInsert
