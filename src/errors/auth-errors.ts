import { Data } from 'effect'

export class BetterAuthError extends Data.TaggedError('BetterAuthError')<{
  cause?: unknown
  message: string
}> {}

export class UnauthenticatedError extends Data.TaggedError(
  'UnauthenticatedError'
) {}

export class UnauthorizedError extends Data.TaggedError('UnauthorizedError') {}
