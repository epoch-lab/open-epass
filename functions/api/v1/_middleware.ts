import { $responseErr } from '#/_utils/response'

export const onRequest: PagesFunction<Env> = async (c) => {
  try {
    return await c.next()
  } catch (err) {
    if (err instanceof Error) {
      return $responseErr(err.message)
    }
    return $responseErr(`Internal server error: ` + err)
  }
}
