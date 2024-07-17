import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { TextInput } from '@/components/text-input'
import { IconArrowRight, IconLock, IconUser } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$appName/signin')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()

  return (
    <>
      <HeroTitle>登录</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">没有回声通行证？</span>
        <Link to="/$appName/signup" params={{ appName }}>
          前往注册
        </Link>
      </div>

      <div className="px-12 mt-16 flex flex-col">
        <div className="flex flex-col gap-4">
          <TextInput
            icon={<IconUser stroke={1.5} size={18} />}
            type="text"
            name="identity"
            placeholder="用户名 / 邮箱"
            className="w-full"
          />
          <TextInput
            icon={<IconLock stroke={1.5} size={18} />}
            type="password"
            name="password"
            placeholder="密码"
            className="w-full"
          />
          <label className="flex gap-2 items-center text-sm self-start cursor-pointer">
            <Checkbox />
            记住我
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center px-12 gap-2">
        <Button className="w-full">
          <IconArrowRight />
        </Button>
        <Link to="/$appName/recovery" params={{ appName }} className="text-sm">
          忘记密码
        </Link>
      </div>
    </>
  )
}
