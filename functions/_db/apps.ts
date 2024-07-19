export interface AppAttributes {
  displayName?: string
  logoUrl?: string
  [property: string]: any
}

export async function createApp(
  db: D1Database,
  args: {
    appName: string
    appSecret: string
    redirectUrl: string
    attributes?: AppAttributes
  },
) {
  const attrs = args.attributes || {}

  let result: D1Response
  try {
    result = await db
      .prepare(
        'INSERT INTO apps (app_name, app_secret, redirect_url, attributes) VALUES (?, ?, ?, ?)',
      )
      .bind(
        args.appName,
        args.appSecret,
        args.redirectUrl,
        JSON.stringify(attrs),
      )
      .run()
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed: apps.app_name')
    ) {
      throw new Error('Duplicated app name')
    }
    throw error
  }

  if (!result.success) {
    throw new Error('Failed to create app')
  }
}

export async function getAppByName(
  db: D1Database,
  args: {
    appName: string
  },
) {
  const result = await db
    .prepare(
      'SELECT app_id, app_name, app_secret, redirect_url, attributes FROM apps WHERE app_name = ?',
    )
    .bind(args.appName)
    .first<{
      app_id: number
      app_name: string
      app_secret: string
      redirect_url: string
      attributes: string
    }>()

  if (result) {
    return {
      appId: result.app_id,
      appName: result.app_name,
      appSecret: result.app_secret,
      redirectUrl: result.redirect_url,
      attributes: JSON.parse(result.attributes) as AppAttributes,
    }
  }
  return null
}

export async function updateAppProfileById(
  db: D1Database,
  args: {
    appId: number
    appName: string
    appSecret: string
    redirectUrl: string
    attributes?: AppAttributes
  },
) {
  const attrs = args.attributes || {}

  let result: D1Response
  try {
    result = await db
      .prepare(
        'UPDATE apps SET app_name = ?, app_secret = ?, redirect_url = ?, attributes = ? WHERE app_id = ?',
      )
      .bind(
        args.appName,
        args.appSecret,
        args.redirectUrl,
        JSON.stringify(attrs),
        args.appId,
      )
      .run()
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed: apps.app_name')
    ) {
      throw new Error('Duplicated app name')
    }
    throw error
  }

  if (!result.success) {
    throw new Error('Failed to update app profile')
  }
}

export async function deleteAppById(
  db: D1Database,
  args: {
    appId: number
  },
) {
  const result = await db
    .prepare('DELETE FROM apps WHERE app_id = ?')
    .bind(args.appId)
    .run()

  if (!result.success) {
    throw new Error('Failed to delete app')
  }
}
