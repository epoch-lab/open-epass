import { FieldError } from 'react-hook-form'

export function FormError({ error }: { error?: FieldError }) {
  return (
    <div className="h-5 flex items-center text-xs text-red-500">
      {error && error.message}
    </div>
  )
}
