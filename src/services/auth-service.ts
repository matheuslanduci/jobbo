import { Data, Effect } from 'effect'
import { auth } from '~/lib/server-auth'

export class BetterAuthError extends Data.TaggedError('BetterAuthError')<{
  cause?: unknown
  message: string
}> {}

type CreateUserParams = {
  email: string
  name: string
  password: string
  role?: 'user' | 'admin' | ('user' | 'admin')[]
}

export class AuthService extends Effect.Service<AuthService>()('AuthService', {
  effect: Effect.gen(function* () {
    const createUser = (user: CreateUserParams) =>
      Effect.tryPromise({
        try: () =>
          auth.api.createUser({
            body: {
              email: user.email,
              name: user.name,
              password: user.password,
              ...(user.role !== undefined ? { role: user.role } : {})
            }
          }),
        catch: (error) =>
          new BetterAuthError({
            cause: error,
            message: 'Failed to create user'
          })
      })

    return { createUser } as const
  })
}) {}
