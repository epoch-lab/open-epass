export async function sha256(s: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(s)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

export async function hmacSha256(msg: string, key: string) {
  const enc = new TextEncoder()
  const keyBuffer = enc.encode(key)
  const msgBuffer = enc.encode(msg)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  )

  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msgBuffer)

  const signatureArray = Array.from(new Uint8Array(signatureBuffer))
  const signatureHex = signatureArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return signatureHex
}
