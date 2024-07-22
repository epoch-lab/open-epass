import { Title } from '@/components/title'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createLazyFileRoute('/example-app/')({
  component: Page,
})

function base64UrlToUint8Array(base64Url: string) {
  base64Url = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  const rawData = atob(base64Url)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function decryptSauce(sauce: string, key: string) {
  const ciphertextArray = base64UrlToUint8Array(sauce)

  const iv = ciphertextArray.slice(0, 12)
  const actualCiphertext = ciphertextArray.slice(12)

  const encoder = new TextEncoder()
  const keyBuffer = encoder.encode(key)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM' },
    false,
    ['decrypt'],
  )

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    cryptoKey,
    actualCiphertext,
  )

  const decoder = new TextDecoder()
  const decryptedText = decoder.decode(decryptedBuffer)
  return JSON.stringify(JSON.parse(decryptedText), null, 2)
}

function Page() {
  const params = new URLSearchParams(document.location.search)
  const sauce = params.get('sauce')
  const [userInfo, setUserInfo] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (!sauce) {
        return
      }

      setUserInfo(await decryptSauce(sauce, '00000000000000000000000000000000'))
    })()
  }, [sauce])

  return (
    <div className="min-h-[100svh] bg-white">
      <Title>示例 App</Title>
      <div className="flex max-w-screen-sm flex-col gap-2 p-4 text-justify">
        <p>
          点击下面的链接进行登录，此示例 App 的 appName 为 example，因此跳转到
          /connect/example
        </p>
        <a href="/connect/example/" className="text-blue-500 underline">
          登录
        </a>
        <p>登录成功后会携带 sauce 重定向到这个页面</p>
        <p>
          sauce 为 Base64URL 编码的二进制，前 12 字节为 IV，其余字节为
          AES-256-GCM 加密的密文，密文内容为用户基本信息和 sauce
          的生成时间，密钥为 App Secret（本示例 App 的 App Secret 为 32 个 0）
        </p>
        <p>如果携带了 sauce，sauce 和解密结果将在下面显示：</p>
        {sauce ? (
          <>
            <div className="break-all rounded border bg-gray-100 p-2 font-mono">
              {sauce}
            </div>
            <div className="mt-4 whitespace-pre break-all rounded border bg-gray-100 p-2 font-mono">
              {userInfo}
            </div>
          </>
        ) : (
          <p>没有携带 sauce</p>
        )}
        <a href="/i" className="text-blue-500 underline">
          查看我的通行证
        </a>
      </div>
    </div>
  )
}
