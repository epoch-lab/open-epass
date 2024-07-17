import { AppLogo } from '@/components/app-logo'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/$appName')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()

  return (
    <div className="min-h-[100svh] bg-gray-50 flex flex-col items-center px-2">
      <div className="w-full max-w-[400px] bg-white rounded-lg h-[600px] shadow-xl mt-[10vh] flex flex-col overflow-hidden">
        <div className="p-4 flex justify-end">
          <AppLogo />
        </div>

        <Outlet />

        <div className="mt-auto flex p-4 items-center border-t">
          <div className="flex-grow">
            <p className="text-sm opacity-50 tracking">使用回声通行证连接</p>
            <p className="text-3xl">{appName}</p>
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
