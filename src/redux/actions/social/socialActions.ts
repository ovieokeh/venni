import {
  UPDATE_FRIEND_LIST,
  UPDATE_RECEIVED_INVITES,
  UPDATE_SENT_INVITES,
  NEW_FRIEND_NOTIFICATION,
  READ_NOTIFICATION,
  UserProfile
} from '../../types'

export const updateFriendList = (friends: UserProfile[]) => ({
  type: UPDATE_FRIEND_LIST,
  friends
})

export const updateReceivedInvites = (invites: UserProfile[]) => ({
  type: UPDATE_RECEIVED_INVITES,
  invites
})

export const updateSentInvites = (invites: UserProfile[]) => ({
  type: UPDATE_SENT_INVITES,
  invites
})

export const newFriendNotification = (friendId: string) => ({
  type: NEW_FRIEND_NOTIFICATION,
  friendId
})

export const readNotification = (friendId: string) => ({
  type: READ_NOTIFICATION,
  friendId
})
