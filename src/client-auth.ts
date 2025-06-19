import { createAuthClient } from 'better-auth/client'
import {
  adminClient,
  anonymousClient,
  apiKeyClient,
  emailOTPClient
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [adminClient(), anonymousClient(), emailOTPClient(), apiKeyClient()]
})
