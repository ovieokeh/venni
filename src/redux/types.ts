export const AUTH_BEGIN = 'AUTH_BEGIN'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGOUT = 'LOGOUT'

export interface AuthCredentials {
  name?: string
  email: string
  password: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  avatar: string
  createdAt: Date | null
}

export interface Message {
  message: string
  receiver: string
  sender: string
  timestamp: number
}

export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS'
export interface GetUserProfileSuccess {
  type: typeof GET_USER_PROFILE_SUCCESS
  profile: UserProfile
}

export type ProfileTypes = GetUserProfileSuccess

// _____________ Drawer Types _____________
export const SHOW_DRAWER = 'SHOW_DRAWER'
export interface ShowDrawer {
  type: typeof SHOW_DRAWER
}

export const HIDE_DRAWER = 'HIDE_DRAWER'

export interface HideDrawer {
  type: typeof HIDE_DRAWER
}

export interface DrawerState {
  showDrawer: boolean
}

export type DrawerTypes = ShowDrawer | HideDrawer

// _____________ Invite Types _____________
export const UPDATE_SENT_INVITES = 'UPDATE_SENT_INVITES'
export interface UpdateSentInvites {
  type: typeof UPDATE_SENT_INVITES
  invites: UserProfile[]
}

export const UPDATE_RECEIVED_INVITES = 'UPDATE_RECEIVED_INVITES'
export interface UpdateReceivedInvites {
  type: typeof UPDATE_RECEIVED_INVITES
  invites: UserProfile[]
}

export const UPDATE_FRIEND_LIST = 'UPDATE_FRIEND_LIST'
export interface UpdateFriendList {
  type: typeof UPDATE_FRIEND_LIST
  friends: UserProfile[]
}

export type InviteTypes =
  | UpdateSentInvites
  | UpdateReceivedInvites
  | UpdateFriendList

// _____________ Invite Types _____________
export const UPDATE_SENT_MESSAGES = 'UPDATE_SENT_MESSAGES'
export const UPDATE_RECEIVED_MESSAGES = 'UPDATE_RECEIVED_MESSAGES'

export interface UpdateSentMessages {
  type: typeof UPDATE_SENT_MESSAGES
  messages: Message[]
}

export interface UpdateReceivedMessages {
  type: typeof UPDATE_RECEIVED_MESSAGES
  messages: Message[]
}

export type MessageTypes = UpdateSentMessages | UpdateReceivedMessages

// =============================================
export interface SocialState {
  friends: UserProfile[]
  receivedInvites: UserProfile[]
  sentInvites: UserProfile[]
}

export interface MessageState {
  sentMessages: Message[]
  receivedMessages: Message[]
}

export interface ReduxState {
  profile: UserProfile
  drawer: DrawerState
  social: SocialState
  messages: MessageState
}
