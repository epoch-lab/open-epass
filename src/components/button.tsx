import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

export const Button = forwardRef<
  React.ComponentRef<'button'>,
  React.ComponentPropsWithoutRef<'button'>
>(function Button({ className, ...props }, ref) {
  return (
    <button
      className={cn(
        'bg-blue-500 grid place-items-center text-white h-10 px-4 rounded-md transition enabled:hover:bg-blue-600 disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
