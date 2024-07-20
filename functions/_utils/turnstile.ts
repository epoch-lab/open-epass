import { CLOUDFLARE_TURNSTILE_SECRET_KEY } from '#/_configs'

export async function $verfiyTurnstile(
  token: string,
  context: EventContext<Env, any, Record<string, unknown>>,
) {
  if (context.env.IS_DEV) {
    return
  }

  const ip = context.request.headers.get('CF-Connecting-IP')
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  const resp = await fetch(url, {
    body: JSON.stringify({
      secret: CLOUDFLARE_TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
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
