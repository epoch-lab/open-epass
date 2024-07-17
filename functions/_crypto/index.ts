export async function sha256(s: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(s)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

export async function hmacSha256Buffer(
  msg: ArrayBuffer | ArrayBufferView,
  key: ArrayBuffer | ArrayBufferView | JsonWebKey
) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  )

  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msg)

  return new Uint8Array(signatureBuffer)
}

export async function hmacSha256String(msg: string, key: string) {
  const enc = new TextEncoder()
  const keyBuffer = enc.encode(key)
  const msgBuffer = enc.encode(msg)

  return digestHex(await hmacSha256Buffer(msgBuffer, keyBuffer))
}

export function digestHex(data: Uint8Array) {
  const arr = Array.from(data)
  return arr.map((b) => b.toString(16).padStart(2, '0')).join('')
}
