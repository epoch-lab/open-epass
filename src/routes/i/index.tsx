import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/i/')({
  component: Page,
})

function Page() {
  return <Navigate to="/i/profile" replace />
}
