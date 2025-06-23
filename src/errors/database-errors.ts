import { Data } from 'effect'

export class DatabaseError extends Data.TaggedClass('DatabaseError')<{
  cause?: unknown
  message: string
}> {}
