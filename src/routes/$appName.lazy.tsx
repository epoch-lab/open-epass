import { AppLogo } from '@/components/app-logo'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/$appName')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()

  return (
    <div className="flex min-h-[100svh] flex-col items-center bg-gray-50 px-2">
      <div className="mt-[10vh] flex h-[600px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex justify-end p-4">
          <AppLogo />
        </div>

        <Outlet />

        <div className="mt-auto flex items-center border-t p-4">
          <div className="flex-grow">
            <p className="tracking text-sm opacity-50">使用回声通行证连接</p>
            <p className="text-3xl">{appName}</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-gray-200 text-sm text-gray-400">
            Logo
          </div>
        </div>
      </div>
      <div className="mb-4 mt-8 text-sm opacity-25">© Epoch Lab</div>
    </div>
  )
}
