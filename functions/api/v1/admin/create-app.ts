import { createApp } from '#/_db/apps'
import { $parseAdminJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const createAppSchema = z.object({
  appName: z.string().min(1, 'App 名不能为空'),
  appSecret: z
    .string()
    .length(32, 'App Secret 应为 32 位')
    .regex(/^[a-zA-Z0-9]*$/, 'App Secret 只能含有字母与数字'),
  redirectUrl: z.string().url('重定向 URL 不正确'),
  attributes: z.optional(z.record(z.string(), z.any())),
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  await $parseAdminJwt(c)
  const data = await $parseBody(c, createAppSchema)

  await createApp(c.env.DB, {
    appName: data.appName,
    appSecret: data.appSecret,
    redirectUrl: data.redirectUrl,
    attributes: data.attributes,
  })

  return $responseOk(null)
}
