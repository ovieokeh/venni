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
  profile: UserProfile
  drawer: DrawerState
  social: SocialState
}

export const GET_INVITES_SUCCESS = 'GET_INVITES_SUCCESS'
export const NEW_RECEIVED_INVITE = 'NEW_RECEIVED_INVITE'
export const NEW_SENT_INVITE = 'NEW_SENT_INVITE'
export const CANCELED_SENT_INVITE = 'CANCELED_SENT_INVITE'
export const DECLINED_SENT_INVITE = 'DECLINED_SENT_INVITE'
export const ACCEPTED_SENT_INVITE = 'ACCEPTED_SENT_INVITE'
export const DECLINED_RECEIVED_INVITE = 'DECLINED_RECEIVED_INVITE'
export const CANCELED_RECEIVED_INVITE = 'CANCELED_RECEIVED_INVITE'
export const ACCEPTED_RECEIVED_INVITE = 'ACCEPTED_RECEIVED_INVITE'
export const UNFRIEND = 'UNFRIEND'

export interface Invite {
  id: string
  name: string
  email: string
  avatarUrl: string
}

export interface AllInvites {
  receivedInvites: Invite[]
  sentInvites: Invite[]
}

export interface GetInvitesSuccess {
  type: typeof GET_INVITES_SUCCESS
  allInvites: AllInvites
}

export interface NewFriendInvite {
  type: typeof NEW_RECEIVED_INVITE
  invite: Invite
}

export interface NewSentInvite {
  type: typeof NEW_SENT_INVITE
  invite: Invite
}

export interface HandledSentInvite {
  type: typeof CANCELED_SENT_INVITE | typeof DECLINED_SENT_INVITE
  inviteId: string
}

export interface HandledReceivedInvite {
  type: typeof CANCELED_RECEIVED_INVITE | typeof DECLINED_RECEIVED_INVITE
  inviteId: string
}

export interface AcceptedSentInvite {
  type: typeof ACCEPTED_SENT_INVITE
  friend: UserProfile
}

export interface AcceptedReceivedInvite {
  type: typeof ACCEPTED_RECEIVED_INVITE
  friend: UserProfile
}

export interface Unfriend {
  type: typeof UNFRIEND
  id: string
}

export interface SocialState {
  friends: UserProfile[]
  receivedInvites: Invite[]
  sentInvites: Invite[]
}

export type FriendType =
  | GetInvitesSuccess
  | NewFriendInvite
  | NewSentInvite
  | HandledSentInvite
  | HandledReceivedInvite
  | AcceptedSentInvite
  | AcceptedReceivedInvite
  | Unfriend
