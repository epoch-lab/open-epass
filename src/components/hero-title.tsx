import { ReactNode } from 'react'

export function HeroTitle({ children }: { children: ReactNode }) {
  return (
    <div className="px-12 relative flex items-center">
      <div className="bg-blue-500 w-8 absolute h-4 left-0"></div>
      <h1 className="text-3xl">{children}</h1>
    </div>
  )
}
