import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/database/*.sql.ts',
  out: './migrations'
})
