import { genCode } from '#/_crypto/verification-code'
import { getUserByEmail } from '#/_db/users'
import { $parseUserJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const userId = await $parseUserJwt(c)
  const data = await $parseBody(
    c,
    z.object({
      newEmail: z.string().email(),
      // TODO: Add captcha.
    }),
  )

  if ((await getUserByEmail(c.env.DB, { email: data.newEmail })) !== null) {
    // 邮箱已存在，这里假装 OK，防止邮箱嗅探
    return $responseOk(null)
  }

  const result = await genCode(userId + data.newEmail)

  console.log(result)

  return $responseOk(null)
}
