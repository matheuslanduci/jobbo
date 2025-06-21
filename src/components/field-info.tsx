import type { AnyFieldApi } from '@tanstack/react-form'

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <span className="text-destructive text-xs">
          {field.state.meta.errors[0].message || 'This field is invalid.'}
        </span>
      ) : null}
    </>
  )
}
