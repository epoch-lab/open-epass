import { store } from '@/atoms/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Provider } from 'jotai'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </Provider>
    </>
  ),
})
