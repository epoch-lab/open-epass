import { SERVER_SECRET } from '#/_config'
import * as jose from 'jose'

const secret = new TextEncoder().encode(SERVER_SECRET)

export async function signUserJwt(userId: number, expiration: string) {
  const jwt = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiration)
    .sign(secret)

  return jwt
}

export async function $parseUserJwt(
  context: EventContext<Env, any, Record<string, unknown>>,
) {
  const authHeader = context.request.headers.get('authorization')
  const jwt = authHeader?.replace(/^Bearer\s+/i, '')

  if (!jwt) {
    throw new Error('Invalid token')
  }

  let result: jose.JWTVerifyResult<jose.JWTPayload>
  try {
    result = await jose.jwtVerify(jwt, secret)
  } catch (_) {
    throw new Error('Invalid token')
  }

  const { userId } = result.payload
  if (typeof userId !== 'number') {
    throw new Error('Invalid token')
  }

  return userId
}
