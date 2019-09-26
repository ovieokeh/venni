import {
  UPDATE_FRIEND_LIST,
  UPDATE_RECEIVED_INVITES,
  UPDATE_SENT_INVITES,
  InviteTypes,
  SocialState
} from '../../types'

const initialState: SocialState = {
  friends: [],
  receivedInvites: [],
  sentInvites: []
}

export function socialReducer(
  state = initialState,
  action: InviteTypes
): SocialState {
  switch (action.type) {
    case UPDATE_FRIEND_LIST:
      return {
        ...state,
        friends: action.friends
      }

    case UPDATE_RECEIVED_INVITES:
      return {
        ...state,
        receivedInvites: action.invites
      }

    case UPDATE_SENT_INVITES:
      return {
        ...state,
        sentInvites: action.invites
      }

    default:
      return state
  }
}
