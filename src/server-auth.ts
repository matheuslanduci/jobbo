import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, anonymous, apiKey, emailOTP } from 'better-auth/plugins'
import { db } from './database/database'

export const auth = betterAuth({
  plugins: [
    admin(),
    anonymous(),
    emailOTP({
      sendVerificationOTP: async () => {
        // TODO: Implement email sending logic
      }
    }),
    apiKey()
  ],
  database: drizzleAdapter(db, {
    provider: 'sqlite'
  })
})
