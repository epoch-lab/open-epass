import { cn } from '@/utils/cn'
import { Link as LinkPrimitive } from '@tanstack/react-router'
import { ComponentPropsWithoutRef } from 'react'

export function Link({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof LinkPrimitive>) {
  return (
    <LinkPrimitive
      className={cn('opacity-50 transition hover:opacity-100', className)}
      {...props}
    />
  )
}
