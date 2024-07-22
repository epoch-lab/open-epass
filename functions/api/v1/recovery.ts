import { checkCode } from '#/_crypto/verification-code'
import { updateUserPasswordByEmail } from '#/_db/users'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { email, emailCode, password } from '#/_utils/schema'
import { z } from 'zod'

export const recoverySchema = z.object({
  email,
  emailCode,
  newPassword: password,
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
