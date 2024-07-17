import { cn } from '@/utils/cn'
import { IconLoader2 } from '@tabler/icons-react'

export function Spinner({ className }: { className?: string }) {
  return <IconLoader2 className={cn('animate-spin', className)} />
}
