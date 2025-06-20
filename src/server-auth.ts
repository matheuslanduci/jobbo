import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, anonymous, apiKey, emailOTP } from 'better-auth/plugins'
import { reactStartCookies } from 'better-auth/react-start'
import { db } from './database/database'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    admin(),
    anonymous(),
    emailOTP({
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async () => {
        // TODO: Implement email sending logic
      }
    }),
    apiKey(),
    reactStartCookies()
  ],
  database: drizzleAdapter(db, {
    provider: 'sqlite'
  })
})
