import logo from '@/assets/epass.webp'
import { cn } from '@/utils/cn'

export function AppLogo({ className }: { className?: string }) {
  return (
    <img
      className={cn('h-5 opacity-50', className)}
      src={logo}
      draggable={false}
    />
  )
}
