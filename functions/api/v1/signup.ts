import { checkCode } from '#/_crypto/verification-code'
import { createUser } from '#/_db/users'
import { $parseBody } from '#/_utils/request'
import { $responseErr, $responseOk } from '#/_utils/response'
import {
  displayName,
  email,
  emailCode,
  password,
  username,
} from '#/_utils/schema'
import { z } from 'zod'

export const signupSchema = z.object({
  email,
  emailCode,
  username,
  displayName,
  password,
})

export const onRequestPost: PagesFunction<Env> = async (c) => {
  const data = await $parseBody(c, signupSchema)

  if (!(await checkCode(['signup-verify', data.email], data.emailCode))) {
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
