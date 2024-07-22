import { $fetch, $userAuthHeader } from '@/utils/fetch'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useUpdateProfileMutation = (
  options?: Exclude<
    UseMutationOptions<
      unknown,
      Error,
      {
        newUsername?: string
        newDisplayName?: string
      }
    >,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: (v: { newUsername?: string; newDisplayName?: string }) =>
      $fetch('/api/v1/user/update-profile', {
        method: 'post',
        headers: $userAuthHeader(),
        body: JSON.stringify(v),
      }),
    ...options,
  })
