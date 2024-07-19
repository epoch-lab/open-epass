import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'

export function Avatar({
  email,
  className,
}: {
  email: string
  className?: string
}) {
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    ;(async () => {
      const encoder = new TextEncoder()
      const data = encoder.encode(email)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')

      setAvatarUrl(`https://gravatar.loli.net/avatar/${hashHex}?s=200&d=retro`)
    })()
  }, [email])

  return (
    <div
      className={cn(
        'h-24 w-24 overflow-hidden rounded-full bg-gray-100',
        className,
      )}
    >
      <img
        className={cn('h-full w-full object-cover', !avatarUrl && 'opacity-0')}
        src={avatarUrl}
      />
    </div>
  )
}
