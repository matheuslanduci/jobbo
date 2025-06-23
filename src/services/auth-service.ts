import { gen, Service, tryPromise } from 'effect/Effect'
import { BetterAuthError, UnauthenticatedError } from '~/errors/auth-errors'
import { auth } from '~/lib/server-auth'

type CreateUserParams = {
  email: string
  name: string
  password: string
  role?: 'user' | 'admin' | ('user' | 'admin')[]
}

export class AuthService extends Service<AuthService>()('AuthService', {
  accessors: true,
  effect: gen(function* () {
    const createUser = (user: CreateUserParams) =>
      tryPromise({
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

    const getSession = (headers: Headers) =>
      gen(function* () {
        const result = yield* tryPromise({
          try: () =>
            auth.api.getSession({
              headers
            }),
          catch: (error) =>
            new BetterAuthError({
              cause: error,
              message: 'Failed to fetch session'
            })
        })

        if (!result) return yield* new UnauthenticatedError()

        return result
      })

    return { createUser, getSession } as const
  })
}) {}
