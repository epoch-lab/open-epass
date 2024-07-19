import { genCode } from '#/_crypto/verification-code'
import { getUserByEmail } from '#/_db/users'
import { sendSignupVerifyCodeEmail } from '#/_utils/email'
import { $parseBody, $parseIp } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { $verfiyTurnstile } from '#/_utils/turnstile'
import { z } from 'zod'

export const signupVerifySchema = z.object({
  email: z.string().min(1, '邮箱不能为空').email('邮箱格式不正确'),
  turnstile: z.string().min(1, '请完成人机验证'),
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(c, signupVerifySchema)

  await $verfiyTurnstile(data.turnstile, $parseIp(c))

  if ((await getUserByEmail(c.env.DB, { email: data.email })) !== null) {
    // 邮箱已经存在，这里假装 OK，防止邮箱嗅探
    return $responseOk(null)
  }

  const result = await genCode(['signup-verify', data.email])

  await sendSignupVerifyCodeEmail(data.email, result.code, result.expiration)

  return $responseOk(null)
}
