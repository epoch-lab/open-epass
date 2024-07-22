import { CLOUDFLARE_TURNSTILE_SITE_KEY } from '@/configs'
import { cn } from '@/utils/cn'
import TurnstilePrimitive, { TurnstileCallbacks } from 'react-turnstile'

export function Turnstile({
  className,
  ...props
}: { className?: string } & TurnstileCallbacks) {
  return (
    <TurnstilePrimitive
      className={cn('bg-[#fafafa]', className)}
      sitekey={CLOUDFLARE_TURNSTILE_SITE_KEY}
      refreshExpired="auto"
      retry="never"
      fixedSize
      {...props}
    />
  )
}
