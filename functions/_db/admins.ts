import { hashPassword } from '#/_crypto/password'

export async function createAdmin(
  db: D1Database,
  args: {
    adminName: string
    password: string
  }
) {
  const result = await db
    .prepare('INSERT INTO admins (admin_name, password) VALUES (?, ?)')
    .bind(args.adminName, await hashPassword(args.password))
    .run()

  if (!result.success) {
    throw new Error('Failed to create admin')
  }
}

export async function loginAdminByName(
  db: D1Database,
  args: {
    adminName: string
    password: string
  }
) {
  const result = await db
    .prepare('SELECT password FROM admins WHERE admin_name = ?')
    .bind(args.adminName)
    .first<{ password: string }>()

  if (!result) {
    return false
  }

  if (result.password === (await hashPassword(args.password))) {
    return true
  }

  return false
}

export async function updateAdminPasswordByName(
  db: D1Database,
  args: {
    adminName: string
    newPassword: string
  }
) {
  const hashedPassword = await hashPassword(args.newPassword)

  const result = await db
    .prepare('UPDATE admins SET password = ? WHERE admin_name = ?')
    .bind(hashedPassword, args.adminName)
    .run()

  if (!result.success) {
    throw new Error('Failed to update admin password')
  }
}

export async function deleteAdminByName(
  db: D1Database,
  args: {
    adminName: string
  }
) {
  const result = await db
    .prepare('DELETE FROM admins WHERE admin_name = ?')
    .bind(args.adminName)
    .run()

  if (!result.success) {
    throw new Error('Failed to delete admin')
  }
}
