import {
  aes256GcmEncryptBuffer,
  bufferToBase64Url,
  genRandomAesGcmIvBuffer,
} from '.'

export async function makeSauce(payload: Record<string, any>, secret: string) {
  const payloadWithDate = {
    ...payload,
    issueDate: Math.floor(new Date().getTime() / 1000),
  }

  const ivBuffer = genRandomAesGcmIvBuffer()
  const encryptedBuffer = new Uint8Array(
    await aes256GcmEncryptBuffer(
      JSON.stringify(payloadWithDate),
      secret,
      ivBuffer,
    ),
  )

  const mergedBuffer = new Uint8Array(
    ivBuffer.length + encryptedBuffer.byteLength,
  )
  mergedBuffer.set(ivBuffer, 0)
  mergedBuffer.set(encryptedBuffer, ivBuffer.length)

  return bufferToBase64Url(mergedBuffer)
}
