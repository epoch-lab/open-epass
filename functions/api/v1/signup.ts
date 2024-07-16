import { checkCode } from '#/_crypto/verification-code'
import { createUser } from '#/_db/users'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import { z } from 'zod'

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(
    c,
    z.object({
      email: z.string().email(),
      emailCode: z.string(),
      username: z.string(),
      displayName: z.string(),
      password: z.string(),
    })
  )

  if (!(await checkCode(data.email, data.emailCode))) {
    return $responseErr('Invalid email code')
  }

  await createUser(c.env.DB, {
    email: data.email,
    username: data.username,
    displayName: data.displayName,
    password: data.password,
  })

  return $responseOk(null)
}
