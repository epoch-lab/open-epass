export async function sha256(s: string) {
  const enc = new TextEncoder()
  const data = enc.encode(s)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

export async function hmacSha256Buffer(
  msg: ArrayBuffer | ArrayBufferView,
  key: ArrayBuffer | ArrayBufferView | JsonWebKey,
) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign'],
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

export function bufferToBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_')
}

async function importAes256GcmKey(
  secret: string,
  usage: 'encrypt' | 'decrypt',
): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = enc.encode(secret)

  return await crypto.subtle.importKey(
    'raw',
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    [usage],
  )
}

export function genRandomAesGcmIvBuffer() {
  const randomBuffer = new Uint8Array(12)
  return crypto.getRandomValues(randomBuffer)
}

export async function aes256GcmEncryptBuffer(
  msg: string,
  secret: string,
  ivBuffer: Uint8Array,
): Promise<ArrayBuffer> {
  const key = await importAes256GcmKey(secret, 'encrypt')

  const enc = new TextEncoder()
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: ivBuffer,
    },
    key,
    enc.encode(msg),
  )

  return encrypted
}
