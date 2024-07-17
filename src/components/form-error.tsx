import { FieldError } from 'react-hook-form'

export function FormError({ error }: { error?: FieldError }) {
  return (
    <div className="h-4 flex items-center mt-0.5 text-xs text-red-500 justify-end">
      {error && error.message}
    </div>
  )
}
