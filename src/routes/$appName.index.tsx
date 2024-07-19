import { getUserTokenInfo } from '@/atoms/token'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/$appName/')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()
  const tokenInfo = getUserTokenInfo()

  if (tokenInfo.loggedIn) {
    return <Navigate to="/$appName/continue" params={{ appName }} replace />
  }
  return <Navigate to="/$appName/signin" params={{ appName }} replace />
}
