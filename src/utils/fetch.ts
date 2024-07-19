import { getUserTokenInfo } from '@/atoms/token'

export async function $fetch<T>(input: RequestInfo | URL, init?: RequestInit) {
  const resp = await fetch(input, init)

  if (!resp.ok) {
    throw new Error('Fetch failed: ' + resp.status + ' ' + resp.statusText)
  }

  const data = await resp.json()

  if (!data.success) {
    throw new Error(data.msg)
  }

  return data.payload as T
}

export function $userAuthHeader() {
  const info = getUserTokenInfo()
  if (!info.loggedIn) {
    throw new Error('Not logged in')
  }

  return { Authorization: 'Bearer ' + info.token } as HeadersInit
}
