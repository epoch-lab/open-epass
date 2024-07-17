import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$appName/recovery')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()

  return (
    <>
      <HeroTitle>密码重置</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">想起密码？</span>
        <Link to="/$appName/signin" params={{ appName }}>
          前往登录
        </Link>
      </div>
    </>
  )
}
