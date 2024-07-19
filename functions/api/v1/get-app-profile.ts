import { AppAttributes, getAppByName } from '#/_db/apps'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { z } from 'zod'

export interface GetAppProfileResponse {
  appId: number
  appName: string
  attributes: AppAttributes
}

export const onRequestPost: PagesFunction<Env> = async (c) => {
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

  return $responseOk<GetAppProfileResponse>({
    appId: app.appId,
    appName: app.appName,
    attributes: app.attributes,
  })
}
