import { hashPassword } from '#/_crypto/password'

export async function createUser(
  db: D1Database,
  args: {
    username: string
    email: string
    displayName: string
    password: string
  },
) {
  let result: D1Response
  try {
    result = await db
      .prepare(
        'INSERT INTO users (username, email, display_name, password) VALUES (?, ?, ?, ?)',
      )
      .bind(
        args.username,
        args.email,
        args.displayName,
        await hashPassword(args.password),
      )
      .run()
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed: users.username')
    ) {
      throw new Error('Duplicated username')
    }
    throw error
  }

  if (!result.success) {
    throw new Error('Failed to create user')
  }
}

export async function loginUserByName(
  db: D1Database,
  args: {
    username: string
    password: string
  },
) {
  const result = await db
    .prepare('SELECT user_id, password FROM users WHERE username = ?')
    .bind(args.username)
    .first<{ user_id: number; password: string }>()

  if (!result) {
    return false
  }

  if (result.password === (await hashPassword(args.password))) {
    return result.user_id
  }

  return false
}

export async function loginUserByEmail(
  db: D1Database,
  args: {
    email: string
    password: string
  },
) {
  const result = await db
    .prepare('SELECT user_id, password FROM users WHERE email = ?')
    .bind(args.email)
    .first<{ user_id: number; password: string }>()

  if (!result) {
    return false
  }

  if (result.password === (await hashPassword(args.password))) {
    return result.user_id
  }

  return false
}

export async function getUserByEmail(
  db: D1Database,
  args: {
    email: string
  },
) {
  const result = await db
    .prepare(
      'SELECT user_id, username, display_name, email FROM users WHERE email = ?',
    )
    .bind(args.email)
    .first<{
      user_id: number
      username: string
      display_name: string
      email: string
    }>()

  if (result) {
    return {
      userId: result.user_id,
      username: result.username,
      displayName: result.display_name,
      email: result.email,
    }
  }
  return null
}

export async function getUserById(
  db: D1Database,
  args: {
    userId: number
  },
) {
  const result = await db
    .prepare(
      'SELECT user_id, username, display_name, email FROM users WHERE user_id = ?',
    )
    .bind(args.userId)
    .first<{
      user_id: number
      username: string
      display_name: string
      email: string
    }>()

  if (result) {
    return {
      userId: result.user_id,
      username: result.username,
      displayName: result.display_name,
      email: result.email,
    }
  }
  return null
}

export async function updateUserNameById(
  db: D1Database,
  args: {
    userId: number
    newUsername: string
  },
) {
  const result = await db
    .prepare('UPDATE users SET username = ? WHERE user_id = ?')
    .bind(args.newUsername, args.userId)
    .run()

  if (!result.success) {
    throw new Error('Failed to update username')
  }
}

export async function updateUserDisplayNameById(
  db: D1Database,
  args: {
    userId: number
    newDisplayName: string
  },
) {
  const result = await db
    .prepare('UPDATE users SET display_name = ? WHERE user_id = ?')
    .bind(args.newDisplayName, args.userId)
    .run()

  if (!result.success) {
    throw new Error('Failed to update user display name')
  }
}

export async function updateUserEmailById(
  db: D1Database,
  args: {
    userId: number
    newEmail: string
  },
) {
  const result = await db
    .prepare('UPDATE users SET email = ? WHERE user_id = ?')
    .bind(args.newEmail, args.userId)
    .run()

  if (!result.success) {
    throw new Error('Failed to update user email')
  }
}

export async function updateUserPasswordById(
  db: D1Database,
  args: {
    userId: number
    newPassword: string
  },
) {
  const hashedPassword = await hashPassword(args.newPassword)

  const result = await db
    .prepare('UPDATE users SET password = ? WHERE user_id = ?')
    .bind(hashedPassword, args.userId)
    .run()

  if (!result.success) {
    throw new Error('Failed to update user password')
  }
}

export async function updateUserPasswordByEmail(
  db: D1Database,
  args: {
    email: string
    newPassword: string
  },
) {
  const hashedPassword = await hashPassword(args.newPassword)

  const result = await db
    .prepare('UPDATE users SET password = ? WHERE email = ?')
    .bind(hashedPassword, args.email)
    .run()

  if (!result.success) {
    throw new Error('Failed to update user password')
  }
}

export async function deleteUserById(
  db: D1Database,
  args: {
    userId: number
  },
) {
  const result = await db
    .prepare('DELETE FROM users WHERE user_id = ?')
    .bind(args.userId)
    .run()

  // TODO: Delete related data.

  if (!result.success) {
    throw new Error('Failed to delete user')
  }
}
