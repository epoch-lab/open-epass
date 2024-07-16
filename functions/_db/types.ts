export interface User {
  userId: number
  username: string
  email: string
  password: string
}

export interface Admin {
  admin_id: number
  password: string
}

export interface App {
  app_id: number
  app_name: string
  app_secret: string
  redirect_url: string
  permissions: string
  permissions_date: string
  attributes: string
}

export interface UserAuthorization {
  userid: number
  appid: number
  authorization_date: string
}

export interface UserData {
  user_id: number
  scope_id: number
  scope_data: string
}
