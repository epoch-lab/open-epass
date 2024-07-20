import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/i/profile')({
  component: () => <div>Hello /i/profile!</div>
})