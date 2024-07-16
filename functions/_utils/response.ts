export interface ApiResponseOk<T> {
  success: true
  msg: ''
  payload: T
}

export interface ApiResponseErr {
  success: false
  msg: string
  payload: null
}

export interface Pagination<T> {
  items: T
  hasMore: boolean
}

export function $responseOk<T>(payload: T) {
  return Response.json({
    success: true,
    msg: '',
    payload,
  } as ApiResponseOk<T>)
}

export function $responseErr(msg: string) {
  return Response.json({
    success: false,
    msg,
    payload: null,
  } as ApiResponseErr)
}
