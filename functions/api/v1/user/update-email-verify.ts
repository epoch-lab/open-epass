import { genCode } from '#/_crypto/verification-code'
import { getUserByEmail } from '#/_db/users'
import { updateEmailVerifyCodeEmail } from '#/_utils/email'
import { $parseUserJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { email, turnstile } from '#/_utils/schema'
import { $verfiyTurnstile } from '#/_utils/turnstile'
import { z } from 'zod'

export const userUpdateEmailVerifySchema = z.object({
  newEmail: email,
  turnstile,
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const userId = await $parseUserJwt(c)
  const data = await $parseBody(c, userUpdateEmailVerifySchema)

  await $verfiyTurnstile(data.turnstile, c)

  if ((await getUserByEmail(c.env.DB, { email: data.newEmail })) !== null) {
    // 邮箱已存在，这里假装 OK，防止邮箱嗅探
    return $responseOk(null)
  }

  const result = await genCode([
    'update-email-verify',
    userId.toString(),
    data.newEmail,
  ])

  await updateEmailVerifyCodeEmail(
    data.newEmail,
    result.code,
    result.expiration,
  )

  return $responseOk(null)
}
