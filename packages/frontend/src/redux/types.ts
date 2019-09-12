export const AUTH_BEGIN = 'AUTH_BEGIN'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

export interface AuthCredentials {
  name?: string
  email: string
  password: string
}

export interface AuthErrorResponse {
  location: string
  msg: string
  param: string
  value: string
}

export interface AuthBegin {
  type: typeof AUTH_BEGIN
}

export interface AuthSuccess {
  type: typeof AUTH_SUCCESS
  data: string
}

export interface AuthError {
  type: typeof AUTH_ERROR
  error: AuthErrorResponse[] | string
}

export interface AuthState {
  isLoading: boolean
  token: string
  error: AuthErrorResponse[] | string
}

export type AuthTypes = AuthBegin | AuthSuccess | AuthError
