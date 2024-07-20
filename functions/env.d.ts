declare global {
  interface Env {
    DB: D1Database
    IS_DEV: string | undefined
  }
}

export {}
