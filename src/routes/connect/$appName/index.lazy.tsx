import { getUserTokenInfo } from '@/atoms/token'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/connect/$appName/')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()
  const tokenInfo = getUserTokenInfo()

  if (tokenInfo.loggedIn) {
    return (
      <Navigate to="/connect/$appName/continue" params={{ appName }} replace />
    )
  }
  return <Navigate to="/connect/$appName/signin" params={{ appName }} replace />
}
