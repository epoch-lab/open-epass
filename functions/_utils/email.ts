import {
  TENCENT_CLOUD_SECRET_ID,
  TENCENT_CLOUD_SECRET_KEY,
  TENCENT_CLOUD_SES_EMAIL_FROM,
  TENCENT_CLOUD_SES_REGION,
  TENCENT_CLOUD_SES_SUBJECT_SUFFIX,
  TENCENT_CLOUD_SES_TEMPLATE_ID,
} from '#/_config'
import { digestHex, hmacSha256Buffer, sha256 } from '#/_crypto'
import { $dayjs, formatDate } from './date'

export async function sendCodeEmail(
  dest: string,
  args: {
    opTitle: string
    opDesc: string
    code: string
    exp: number
  },
) {
  const host = 'ses.tencentcloudapi.com'
  const service = 'ses'
  const action = 'SendEmail'
  const version = '2020-10-02'
  const timestamp = parseInt(String(new Date().getTime() / 1000))
  const date = $dayjs(timestamp * 1000).format('YYYY-MM-DD')
  const payload = JSON.stringify({
    FromEmailAddress: TENCENT_CLOUD_SES_EMAIL_FROM,
    Destination: [dest],
    Subject: args.opTitle + TENCENT_CLOUD_SES_SUBJECT_SUFFIX,
    Template: {
      TemplateID: TENCENT_CLOUD_SES_TEMPLATE_ID,
      TemplateData: JSON.stringify({
        op_title: args.opTitle,
        op_desc: args.opDesc,
        code: args.code,
        exp: formatDate(args.exp),
      }),
    },
    Unsubscribe: '0',
    TriggerType: 1,
  })

  const signedHeaders = 'content-type;host'
  const hashedRequestPayload = await sha256(payload)
  const httpRequestMethod = 'POST'
  const canonicalUri = '/'
  const canonicalQueryString = ''
  const canonicalHeaders =
    'content-type:application/json; charset=utf-8\n' + 'host:' + host + '\n'

  const canonicalRequest =
    httpRequestMethod +
    '\n' +
    canonicalUri +
    '\n' +
    canonicalQueryString +
    '\n' +
    canonicalHeaders +
    '\n' +
    signedHeaders +
    '\n' +
    hashedRequestPayload

  const algorithm = 'TC3-HMAC-SHA256'
  const hashedCanonicalRequest = await sha256(canonicalRequest)
  const credentialScope = date + '/' + service + '/' + 'tc3_request'
  const stringToSign =
    algorithm +
    '\n' +
    timestamp +
    '\n' +
    credentialScope +
    '\n' +
    hashedCanonicalRequest

  const enc = new TextEncoder()
  const kDate = await hmacSha256Buffer(
    enc.encode(date),
    enc.encode('TC3' + TENCENT_CLOUD_SECRET_KEY),
  )
  const kService = await hmacSha256Buffer(enc.encode(service), kDate)
  const kSigning = await hmacSha256Buffer(enc.encode('tc3_request'), kService)
  const signature = digestHex(
    await hmacSha256Buffer(enc.encode(stringToSign), kSigning),
  )

  const authorization =
    algorithm +
    ' ' +
    'Credential=' +
    TENCENT_CLOUD_SECRET_ID +
    '/' +
    credentialScope +
    ', ' +
    'SignedHeaders=' +
    signedHeaders +
    ', ' +
    'Signature=' +
    signature

  const resp = await fetch('https://' + host, {
    method: httpRequestMethod,
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json; charset=utf-8',
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Version': version,
      'X-TC-Region': TENCENT_CLOUD_SES_REGION,
    },
    body: payload,
  })

  const data: any = await resp.json()
  if ('Error' in data.Response) {
    console.error('Failed to send email', data)
    throw new Error('Failed to send email')
  }
}

export function sendSignupVerifyCodeEmail(
  dest: string,
  code: string,
  exp: number,
) {
  return sendCodeEmail(dest, {
    opTitle: '注册邮箱验证',
    opDesc: '使用此邮箱注册回声通行证',
    code,
    exp,
  })
}
