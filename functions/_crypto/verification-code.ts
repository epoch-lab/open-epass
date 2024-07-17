import { CODE_TIME_WINDOW_SIZE, SERVER_SECRET } from '#/_config'
import { hmacSha256String } from '.'

function getCurrentTimeWindow() {
  const timestamp = new Date().getTime()
  return Math.floor(timestamp / CODE_TIME_WINDOW_SIZE)
}

export async function genCodeWithTimeWindow(
  payload: string,
  timeWindow: number
) {
  const msg = payload + timeWindow.toString()
  const fullCode = await hmacSha256String(msg, SERVER_SECRET)

  return fullCode.substring(0, 6)
}

export async function genCode(
  payload: string
): Promise<{ code: string; expiration: number }> {
  const timeWindow = getCurrentTimeWindow()

  const code = await genCodeWithTimeWindow(payload, timeWindow)
  // Extend to next time window.
  const expiration = (timeWindow + 2) * CODE_TIME_WINDOW_SIZE

  return {
    code,
    expiration,
  }
}

export async function checkCode(payload: string, code: string) {
  const timeWindow = getCurrentTimeWindow()

  const codes = await Promise.all([
    genCodeWithTimeWindow(payload, timeWindow),
    // Extend to next time window.
    genCodeWithTimeWindow(payload, timeWindow - 1),
  ])

  if (codes.includes(code)) {
    return true
  }
  return false
}
