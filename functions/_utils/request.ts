import { ZodSchema } from 'zod'
import { fromError } from 'zod-validation-error'

export async function $parseBody<T>(
  context: EventContext<Env, any, Record<string, unknown>>,
  schema: ZodSchema<T>
): Promise<T> {
  const data = await context.request.json()
  const result = schema.safeParse(data)

  if (result.success) {
    return result.data
  }

  throw fromError(result.error)
}
