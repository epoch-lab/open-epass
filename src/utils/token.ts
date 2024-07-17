export function getTokenWithPayload(): [string, any] {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new EmptyTokenError()
  }
  const payloadBytes = Uint8Array.from(
    atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')),
    (c) => c.charCodeAt(0),
  )
  const payload = JSON.parse(new TextDecoder().decode(payloadBytes))

  return [token, payload]
}

export function assertNotExpiredToken(payload: any) {
  if (Date.now() > payload.exp * 1000) {
    throw new InvalidTokenError()
  }
}

export function getValidToken() {
  const [token, payload] = getTokenWithPayload()
  assertNotExpiredToken(payload)

  return token
}

export function getValidTokenPayload() {
  const [, payload] = getTokenWithPayload()
  assertNotExpiredToken(payload)

  return payload
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function checkIsValidToken() {
  try {
    getValidToken()
  } catch (error) {
    if (error instanceof TokenError) {
      return false
    }
    throw error
  }
  return true
}

export class TokenError extends Error {}
export class InvalidTokenError extends TokenError {}
export class EmptyTokenError extends TokenError {}
