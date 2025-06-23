import { createMiddleware } from '@tanstack/react-start'
import { getHeaders } from '@tanstack/react-start/server'
import { flatMap, succeed } from 'effect/Effect'
import { UnauthorizedError } from '~/errors/auth-errors'
import { ServerRuntime } from '~/lib/server-runtime'
import { AuthService } from '~/services/auth-service'

export const authMiddleware = createMiddleware({
  type: 'function'
}).server(async ({ next }) => {
  const headers = new Headers(
    Object.entries(getHeaders()).filter(([_, v]) => v !== undefined) as [
      string,
      string
    ][]
  )

  const result = await ServerRuntime.runPromise(AuthService.getSession(headers))

  return next({ context: result })
})

export const adminMiddleware = createMiddleware({
  type: 'function'
}).server(async ({ next }) => {
  const headers = new Headers(
    Object.entries(getHeaders()).filter(([_, v]) => v !== undefined) as [
      string,
      string
    ][]
  )

  const result = await ServerRuntime.runPromise(
    AuthService.getSession(headers).pipe(
      flatMap((auth) => {
        if (auth.user.role?.includes('admin')) return succeed(auth)

        return new UnauthorizedError()
      })
    )
  )

  return next({ context: result })
})
