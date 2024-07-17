import { FieldError } from 'react-hook-form'

export function FormError({ error }: { error?: FieldError }) {
  return (
    <div className="mt-0.5 flex h-4 items-center justify-end text-xs text-red-500">
      {error && error.message}
    </div>
  )
}
