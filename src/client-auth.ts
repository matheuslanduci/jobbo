import {
  adminClient,
  anonymousClient,
  apiKeyClient,
  emailOTPClient
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { clientEnv } from './client-env'

export const authClient = createAuthClient({
  plugins: [adminClient(), anonymousClient(), emailOTPClient(), apiKeyClient()],
  baseURL: clientEnv.VITE_BETTER_AUTH_URL
})

export const { useSession } = authClient
