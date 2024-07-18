import { checkCode } from '#/_crypto/verification-code'
import { updateUserPasswordByEmail } from '#/_db/users'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const recoverySchema = z.object({
  email: z.string().min(1, '邮箱不能为空').email('邮箱格式不正确'),
  emailCode: z.string().min(1, '邮箱验证码不能为空'),
  newPassword: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, '密码需要包含大小写字母与数字')
    .min(6, '密码最短为 6 位')
    .max(64, '密码最长为 64 位'),
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(c, recoverySchema)

  if (!(await checkCode(['recovery-verify', data.email], data.emailCode))) {
    return $responseErr('Invalid email code')
  }

  await updateUserPasswordByEmail(c.env.DB, {
    email: data.email,
    newPassword: data.newPassword,
  })

  return $responseOk(null)
}
