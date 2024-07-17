import { JWT_EXP_LONG, JWT_EXP_NORMAL } from '#/_config'
import { loginUserByEmail } from '#/_db/users'
import { signUserJwt } from '#/_utils/jwt'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const signinEmailSchema = z.object({
  email: z.string(),
  password: z.string(),
  longer: z.boolean(),
  // TODO: Add captcha.
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(c, signinEmailSchema)

  const userId = await loginUserByEmail(c.env.DB, {
    email: data.email,
    password: data.password,
  })

  if (userId) {
    return $responseOk(
      await signUserJwt(userId, data.longer ? JWT_EXP_LONG : JWT_EXP_NORMAL),
    )
  }
  return $responseErr('Invalid email or password')
}
