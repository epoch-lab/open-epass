import { ReactNode } from 'react'

export function HeroTitle({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center px-12">
      <div className="absolute left-0 h-4 w-8 bg-blue-500"></div>
      <h1 className="text-3xl">{children}</h1>
    </div>
  )
}
