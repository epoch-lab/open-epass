import { getUserById } from '#/_db/users'
import { $parseUserJwt } from '#/_utils/jwt'
import { $responseOk } from '#/_utils/response'

export const onRequestGet: PagesFunction<Env> = async (c) => {
  const userId = await $parseUserJwt(c)
  return $responseOk(await getUserById(c.env.DB, { userId }))
}
