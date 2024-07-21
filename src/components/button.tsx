import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

export const Button = forwardRef<
  React.ComponentRef<'button'>,
  React.ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary' | 'ghost'
  }
>(function Button({ variant = 'primary', className, ...props }, ref) {
  return (
    <button
      className={cn(
        'grid h-10 place-items-center rounded-md px-4 text-white transition disabled:opacity-50',
        variant === 'primary' && 'bg-blue-500 enabled:hover:bg-blue-600',
        variant === 'ghost' && 'text-black enabled:hover:bg-black/5',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
