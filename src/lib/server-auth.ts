import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, anonymous, apiKey, emailOTP } from 'better-auth/plugins'
import { reactStartCookies } from 'better-auth/react-start'
import { accountTable } from '~/database/account.sql'
import { apiKeyTable } from '~/database/api-key.sql'
import { db } from '~/database/database'
import { sessionTable } from '~/database/session.sql'
import { userTable } from '~/database/user.sql'
import { verificationTable } from '~/database/verification.sql'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    disableSignUp: true
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
    provider: 'sqlite',
    schema: {
      user: userTable,
      account: accountTable,
      session: sessionTable,
      apiKey: apiKeyTable,
      verification: verificationTable
    }
  })
})
