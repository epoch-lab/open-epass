import { getUserTokenInfo } from '@/atoms/token'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Page,
})

function Page() {
  if (!getUserTokenInfo().loggedIn) {
    return (
      <Navigate
        to="/connect/$appName/signin"
        params={{ appName: 'i' }}
        replace
      />
    )
  }
  return <Navigate to="/i" replace />
}
