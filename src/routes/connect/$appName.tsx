import { GetAppProfileResponse } from '#/api/v1/get-app-profile'
import { AppLogo } from '@/components/app-logo'
import { $fetch } from '@/utils/fetch'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/connect/$appName')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()

  const { isSuccess, data } = useQuery({
    queryKey: ['app-profile', appName],
    queryFn: () =>
      $fetch<GetAppProfileResponse>('/api/v1/get-app-profile', {
        method: 'post',
        body: JSON.stringify({
          appName,
        }),
      }),
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000,
  })

  return (
    <div className="flex min-h-[100svh] flex-col items-center bg-gray-50 px-2">
      <div className="mt-[10vh] flex h-[600px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex justify-end p-4">
          <AppLogo />
        </div>

        <Outlet />

        <div className="mt-auto flex h-[88px] items-center border-t px-4">
          {isSuccess && (
            <>
              <div className="flex-grow">
                <p className="tracking text-sm opacity-50">
                  使用回声通行证连接
                </p>
                <p className="text-xl">
                  {data.attributes.displayName ?? data.appName}
                </p>
              </div>
              {data.attributes.logoUrl && (
                <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-200 text-sm">
                  <img
                    src={data.attributes.logoUrl}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mb-4 mt-8 text-sm opacity-25">© Epoch Lab</div>
    </div>
  )
}
