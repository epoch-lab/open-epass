import { $fetch, $userAuthHeader } from '@/utils/fetch'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export function useConnectAppMutation() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const mutation = useMutation({
    mutationFn: (v: { appName: string }) =>
      $fetch<string>('/api/v1/user/connect-app', {
        method: 'post',
        body: JSON.stringify({ appName: v.appName }),
        headers: $userAuthHeader(),
      }),
    onSuccess(data) {
      setIsRedirecting(true)
      window.location.href = data
    },
  })

  return { isRedirecting, ...mutation }
}
