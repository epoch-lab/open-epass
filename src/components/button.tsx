import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

export const Button = forwardRef<
  React.ComponentRef<'button'>,
  React.ComponentPropsWithoutRef<'button'>
>(function Button({ className, ...props }, ref) {
  return (
    <button
      className={cn(
        'bg-blue-500 grid place-items-center text-white h-10 px-4 rounded-md transition hover:bg-blue-600',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
