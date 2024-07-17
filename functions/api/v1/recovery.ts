import { checkCode } from '#/_crypto/verification-code'
import { updateUserPasswordByEmail } from '#/_db/users'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(
    c,
    z.object({
      email: z.string().email(),
      emailCode: z.string(),
      newPassword: z.string(),
    }),
  )

  if (!(await checkCode(data.email, data.emailCode))) {
    return $responseErr('Invalid email code')
  }

  await updateUserPasswordByEmail(c.env.DB, {
    email: data.email,
    newPassword: data.newPassword,
  })

  return $responseOk(null)
}
