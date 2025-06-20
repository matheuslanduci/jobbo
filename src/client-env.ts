import { Schema } from 'effect'

const clientEnvSchema = Schema.Struct({
  VITE_BETTER_AUTH_URL: Schema.String
})

export const clientEnv = Schema.decodeUnknownSync(clientEnvSchema)(process.env)
