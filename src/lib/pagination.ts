import { Schema } from 'effect'

export const PaginationParams = Schema.Struct({
  page: Schema.optionalWith(
    Schema.Number.pipe(Schema.positive(), Schema.int()),
    { default: () => 1, exact: true }
  ),
  pageSize: Schema.optionalWith(
    Schema.Number.pipe(Schema.positive(), Schema.int(), Schema.clamp(1, 100)),
    { default: () => 20, exact: true }
  )
})
