import { store } from '@/atoms/store'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Provider } from 'jotai'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 24 * 60 * 60 * 1000,
    },
  },
})

persistQueryClient({
  queryClient,
  persister,
})

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
