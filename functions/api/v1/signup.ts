import { checkCode } from '#/_crypto/verification-code'
import { createUser } from '#/_db/users'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().min(1, '邮箱不能为空').email('邮箱格式不正确'),
  emailCode: z.string().min(1, '邮箱验证码不能为空'),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, '用户名只能包含字母、数字、-、_')
    .min(3, '用户名至少 3 个字符')
    .max(16, '用户名最长 16 个字符'),
  displayName: z.string().min(1, '展示名称不能为空'),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, '密码需要包含大小写字母与数字')
    .min(6, '密码最短为 6 位')
    .max(64, '密码最长为 64 位'),
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(c, signupSchema)

  if (!(await checkCode(['signup-verify', data.email], data.emailCode))) {
    return $responseErr('Invalid email code')
  }

  await createUser(c.env.DB, {
    email: data.email,
    username: data.username,
    displayName: data.displayName,
    password: data.password,
  })

  return $responseOk(null)
}
