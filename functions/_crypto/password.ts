import { HASH_SALT } from '#/_config'
import { sha256 } from '.'

export function hashPassword(password: string) {
  return sha256(HASH_SALT + password)
}
