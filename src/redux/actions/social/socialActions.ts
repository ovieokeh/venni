import {
  UPDATE_FRIEND_LIST,
  UPDATE_RECEIVED_INVITES,
  UPDATE_SENT_INVITES,
  UPDATE_SENT_MESSAGES,
  UPDATE_RECEIVED_MESSAGES,
  Message,
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

export const updateSentMessages = (messages: Message[]) => ({
  type: UPDATE_SENT_MESSAGES,
  messages
})

export const updateReceivedMessages = (messages: Message[]) => ({
  type: UPDATE_RECEIVED_MESSAGES,
  messages
})
