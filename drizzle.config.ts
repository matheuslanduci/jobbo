import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_PATH || 'root.db'
  },
  schema: './src/database/*.sql.ts',
  out: './migrations'
})
