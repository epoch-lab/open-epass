import { genCode } from '#/_crypto/verification-code'
import { getUserByEmail } from '#/_db/users'
import { sendRecoveryVerifyCodeEmail } from '#/_utils/email'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { email, turnstile } from '#/_utils/schema'
import { $verfiyTurnstile } from '#/_utils/turnstile'
import { z } from 'zod'

export const recoveryVerifySchema = z.object({
  email,
  turnstile,
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(c, recoveryVerifySchema)

  await $verfiyTurnstile(data.turnstile, c)

  if ((await getUserByEmail(c.env.DB, { email: data.email })) === null) {
    // 邮箱不存在，这里假装 OK，防止邮箱嗅探
    return $responseOk(null)
  }

  const result = await genCode(['recovery-verify', data.email])

  await sendRecoveryVerifyCodeEmail(data.email, result.code, result.expiration)

  return $responseOk(null)
}
