import { Schema } from 'effect'

const serverEnvSchema = Schema.Struct({
  DATABASE_PATH: Schema.String,

  BETTER_AUTH_SECRET: Schema.String,
  BETTER_AUTH_URL: Schema.String,

  RESEND_API_KEY: Schema.String
})

export const serverEnv = Schema.decodeUnknownSync(serverEnvSchema)(process.env)
