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
