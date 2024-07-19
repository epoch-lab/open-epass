import { CLOUDFLARE_TURNSTILE_SECRET_KEY } from '#/_config'

export async function $verfiyTurnstile(token: string, remoteIp?: string) {
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  const resp = await fetch(url, {
    body: JSON.stringify({
      secret: CLOUDFLARE_TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: remoteIp,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result: {
    success: boolean
  } = await resp.json()

  if (!result.success) {
    throw new Error('Invalid Turnstile token')
  }
}
