import { checkCode } from '#/_crypto/verification-code'
import { updateUserEmailById } from '#/_db/users'
import { $parseUserJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { email, emailCode } from '#/_utils/schema'
import { z } from 'zod'

export const userUpdateEmailSchema = z.object({
  newEmail: email,
  newEmailCode: emailCode,
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const userId = await $parseUserJwt(c)
  const data = await $parseBody(c, userUpdateEmailSchema)

  if (
    !(await checkCode(
      ['update-email-verify', userId.toString(), data.newEmail],
      data.newEmailCode,
    ))
  ) {
    return $responseErr('Invalid email code')
  }

  await updateUserEmailById(c.env.DB, {
    userId,
    newEmail: data.newEmail,
  })

  return $responseOk(null)
}
