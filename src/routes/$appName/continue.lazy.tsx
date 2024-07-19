import { getUserTokenInfo } from '@/atoms/token'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { Spinner } from '@/components/spinner'
import { useConnectAppMutation } from '@/hooks/use-connect-app-mutation'
import { useUserProfile } from '@/hooks/use-user-info'
import { IconArrowRight } from '@tabler/icons-react'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/$appName/continue')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()

  const { data, isSuccess } = useUserProfile()
  const { isRedirecting, ...mutation } = useConnectAppMutation()

  function handleConnectApp() {
    mutation.mutate({ appName })
  }

  if (!getUserTokenInfo().loggedIn) {
    return <Navigate to="/$appName/signin" params={{ appName }} replace />
  }

  return (
    <>
      <HeroTitle>欢迎回来</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">这不是您？</span>
        <Link to="/$appName/signin" params={{ appName }}>
          切换账号
        </Link>
      </div>

      {isSuccess && (
        <>
          <div className="mt-16 flex flex-col px-12">
            <Avatar email={data.email} className="self-center" />
            <div className="mt-4 text-center text-2xl">{data.displayName}</div>
            <div className="text-center text-sm opacity-50">
              {data.username}
            </div>
            <Button
              className="mt-10"
              onClick={handleConnectApp}
              disabled={mutation.isPending || isRedirecting}
            >
              {mutation.isPending || isRedirecting ? (
                <Spinner />
              ) : (
                <IconArrowRight />
              )}
            </Button>
          </div>
        </>
      )}
    </>
  )
}
