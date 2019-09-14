export const AUTH_BEGIN = 'AUTH_BEGIN'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGOUT = 'LOGOUT'

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

export interface Logout {
  type: typeof LOGOUT
}

export type AuthTypes = AuthBegin | AuthSuccess | AuthError | Logout

export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS'

export interface UserProfile {
  id: string
  email: string
  name: string
  avatarUrl: string
  createdAt: Date | null
}

export interface GetUserProfileSuccess {
  type: typeof GET_USER_PROFILE_SUCCESS
  profile: UserProfile
}

export interface ProfileState extends UserProfile {
  friends: []
  friendInvites: []
  sentInvites: []
}

export type ProfileTypes = GetUserProfileSuccess

export const SHOW_DRAWER = 'SHOW_DRAWER'
export const HIDE_DRAWER = 'HIDE_DRAWER'

export interface ShowDrawer {
  type: typeof SHOW_DRAWER
}

export interface HideDrawer {
  type: typeof HIDE_DRAWER
}

export interface DrawerState {
  showDrawer: boolean
}

export type DrawerTypes = ShowDrawer | HideDrawer

export interface ReduxState {
  auth: AuthState
  profile: ProfileState
  drawer: DrawerState
}
