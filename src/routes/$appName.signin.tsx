import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { Logo } from '@/components/logo'
import { TextInput } from '@/components/text-input'
import { IconArrowRight, IconLock, IconUser } from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/$appName/signin')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()
  return (
    <div className="min-h-[100svh] bg-gray-50 flex flex-col items-center px-2">
      <div className="w-full max-w-[400px] bg-white rounded-lg h-[600px] shadow-xl mt-[10vh]  flex flex-col overflow-hidden">
        <div className="p-4 flex justify-end">
          <Logo />
        </div>

        <div className="px-12 relative flex items-center">
          <div className="bg-blue-500 w-8 absolute h-4 left-0"></div>
          <h1 className="text-3xl">登录</h1>
        </div>

        <div className="px-12 text-sm leading-loose">
          <span className="opacity-50">没有回声通行证？</span>
          <Link
            to="/$appName/signup"
            params={{ appName }}
            className="opacity-50 transition hover:opacity-100"
          >
            立即注册
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
          <Link
            to="/$appName/signup"
            params={{ appName }}
            className="opacity-50 transition hover:opacity-100 text-sm"
          >
            忘记密码
          </Link>
        </div>

        <div className="mt-auto flex p-4 items-center border-t">
          <div className="flex-grow">
            <p className="text-sm opacity-50 tracking">使用回声通行证连接</p>
            <p className="text-3xl">eFresh</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-gray-200 grid place-items-center text-sm text-gray-400">
            Logo
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm opacity-25 mb-4">© Epoch Lab</div>
    </div>
  )
}
