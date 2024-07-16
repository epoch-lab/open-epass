import { updateUserPasswordById } from '#/_db/users'
import { $parseUserJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const userId = await $parseUserJwt(c)
  const data = await $parseBody(
    c,
    z.object({
      newPassword: z.string(),
    })
  )

  await updateUserPasswordById(c.env.DB, {
    userId,
    newPassword: data.newPassword,
  })

  return $responseOk(null)
}
