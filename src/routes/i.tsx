import { getUserTokenInfo } from '@/atoms/token'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/i')({
  component: Page,
})

function Page() {
  const tokenInfo = getUserTokenInfo()

  if (!tokenInfo.loggedIn) {
    return (
      <Navigate
        to="/connect/$appName/signin"
        params={{ appName: 'i' }}
        replace
      />
    )
  }
  return <Navigate to="/i/profile" replace />
}
