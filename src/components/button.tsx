import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

export const Button = forwardRef<
  React.ComponentRef<'button'>,
  React.ComponentPropsWithoutRef<'button'>
>(function Button({ className, ...props }, ref) {
  return (
    <button
      className={cn(
        'grid h-10 place-items-center rounded-md bg-blue-500 px-4 text-white transition enabled:hover:bg-blue-600 disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
