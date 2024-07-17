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
        className="pl-10 disabled:bg-white pr-4 border-b h-10 outline-none min-w-0 w-full transition focus:border-blue-500 peer"
        ref={ref}
        {...props}
      />
      <div className="absolute pointer-events-none inset-y-0 w-10 grid place-items-center peer-focus:text-blue-500 transition">
        {icon}
      </div>
    </div>
  )
})
