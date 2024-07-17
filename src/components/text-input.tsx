import { cn } from '@/utils/cn'
import { forwardRef, ReactNode } from 'react'

export const TextInput = forwardRef<
  React.ComponentRef<'input'>,
  React.ComponentPropsWithoutRef<'input'> & {
    icon: ReactNode
  }
>(function TextInput({ icon, className, ...props }, ref) {
  return (
    <div className={cn('relative', className)}>
      <input
        className="peer h-10 w-full min-w-0 border-b pl-10 pr-4 outline-none transition focus:border-blue-500 disabled:bg-white"
        ref={ref}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 grid w-10 place-items-center transition peer-focus:text-blue-500">
        {icon}
      </div>
    </div>
  )
})
