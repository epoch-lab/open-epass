import { cn } from '@/utils/cn'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { IconCheck } from '@tabler/icons-react'
import { forwardRef } from 'react'

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border disabled:opacity-50 overflow-hidden',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="grid place-items-center text-blue-500">
      <IconCheck className="w-full h-full" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
