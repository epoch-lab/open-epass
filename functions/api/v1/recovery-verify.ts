import { genCode } from '#/_crypto/verification-code'
import { getUserByEmail } from '#/_db/users'
import { sendRecoveryVerifyCodeEmail } from '#/_utils/email'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const recoveryVerifySchema = z.object({
  email: z.string().min(1, '邮箱不能为空').email('邮箱格式不正确'),
  // TODO: Add captcha.
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(c, recoveryVerifySchema)

  if ((await getUserByEmail(c.env.DB, { email: data.email })) === null) {
    // 邮箱不存在，这里假装 OK，防止邮箱嗅探
    return $responseOk(null)
  }

  const result = await genCode(['recovery-verify', data.email])

  await sendRecoveryVerifyCodeEmail(data.email, result.code, result.expiration)

  return $responseOk(null)
}
