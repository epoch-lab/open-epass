import { updateUserDisplayNameById, updateUserNameById } from '#/_db/users'
import { $parseUserJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const userId = await $parseUserJwt(c)
  const data = await $parseBody(
    c,
    z.object({
      newUsername: z.optional(z.string()),
      newDisplayName: z.optional(z.string()),
    })
  )

  if (data.newUsername) {
    await updateUserNameById(c.env.DB, {
      userId,
      newUsername: data.newUsername,
    })
  }

  if (data.newDisplayName) {
    await updateUserDisplayNameById(c.env.DB, {
      userId,
      newDisplayName: data.newDisplayName,
    })
  }

  return $responseOk(null)
}
