import { genCode } from '#/_crypto/verification-code'
import { getUserByEmail } from '#/_db/users'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(
    c,
    z.object({
      email: z.string().email(),
      // TODO: Add captcha.
    }),
  )

  if ((await getUserByEmail(c.env.DB, { email: data.email })) === null) {
    // 邮箱不存在，这里假装 OK，防止邮箱嗅探
    return $responseOk(null)
  }

  const result = await genCode(data.email)

  console.log(result)

  return $responseOk(null)
}
