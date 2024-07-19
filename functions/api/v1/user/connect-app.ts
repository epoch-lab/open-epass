import { makeSauce } from '#/_crypto/sauce'
import { getAppByName } from '#/_db/apps'
import { getUserById } from '#/_db/users'
import { $parseUserJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const userId = await $parseUserJwt(c)
  const data = await $parseBody(
    c,
    z.object({
      appName: z.string(),
    }),
  )

  const app = await getAppByName(c.env.DB, { appName: data.appName })
  if (!app) {
    return $responseErr('Invalid app name')
  }

  const { appSecret, redirectUrl } = app

  const user = await getUserById(c.env.DB, { userId })
  if (!user) {
    return $responseErr('Invalid user id')
  }

  const sauce = await makeSauce(user, appSecret)

  const url = new URL(redirectUrl)
  url.searchParams.set('sauce', sauce)

  return $responseOk(url.toString())
}
