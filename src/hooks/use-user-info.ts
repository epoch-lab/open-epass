import { useUserTokenInfo } from '@/atoms/token'
import { $fetch, $userAuthHeader } from '@/utils/fetch'
import { useQuery } from '@tanstack/react-query'

export function useUserProfile() {
  const tokenInfo = useUserTokenInfo()
  const query = useQuery({
    queryKey: ['user-profile', tokenInfo.loggedIn && tokenInfo.userId],
    queryFn: () =>
      $fetch<{
        userId: number
        username: string
        displayName: string
        email: string
      }>('/api/v1/user/get-profile', {
        headers: $userAuthHeader(),
      }),
    enabled: tokenInfo.loggedIn,
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 60 * 1000,
  })

  return query
}
