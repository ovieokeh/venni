import {
  ACCEPTED_RECEIVED_INVITE,
  ACCEPTED_SENT_INVITE,
  CANCELED_RECEIVED_INVITE,
  CANCELED_SENT_INVITE,
  DECLINED_RECEIVED_INVITE,
  DECLINED_SENT_INVITE,
  GET_INVITES_SUCCESS,
  NEW_RECEIVED_INVITE,
  NEW_SENT_INVITE,
  FriendType,
  SocialState,
  UNFRIEND,
  GET_FRIENDS_SUCCESS
} from '../../types'
import hydrate from 'src/utilities/hydrate'

const emptyState = {
  friends: [],
  receivedInvites: [],
  sentInvites: []
}
const initialState = hydrate('social', emptyState)

export function socialReducer(
  state = initialState,
  action: FriendType
): SocialState {
  switch (action.type) {
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.friends
      }

    case GET_INVITES_SUCCESS:
      return {
        ...state,
        receivedInvites: action.allInvites.receivedInvites,
        sentInvites: action.allInvites.sentInvites
      }

    case NEW_RECEIVED_INVITE:
      return {
        ...state,
        receivedInvites: [...state.receivedInvites, action.invite]
      }

    case NEW_SENT_INVITE:
      return {
        ...state,
        sentInvites: [...state.sentInvites, action.invite]
      }

    case CANCELED_SENT_INVITE:
    case DECLINED_SENT_INVITE:
      return {
        ...state,
        sentInvites: [...state.sentInvites].filter(
          invite => invite.id !== action.payload
        )
      }

    case DECLINED_RECEIVED_INVITE:
    case CANCELED_RECEIVED_INVITE:
      return {
        ...state,
        receivedInvites: [...state.receivedInvites].filter(
          invite => invite.id !== action.payload
        )
      }

    case ACCEPTED_SENT_INVITE:
      console.log('accepted sent invite', action)
      return {
        ...state,
        sentInvites: [...state.sentInvites].filter(
          invite => invite.id !== action.payload.id
        ),
        friends: [...state.friends, action.payload]
      }

    case ACCEPTED_RECEIVED_INVITE:
      console.log('accepted received invite', action)
      return {
        ...state,
        receivedInvites: [...state.receivedInvites].filter(
          invite => invite.id !== action.payload.id
        ),
        friends: [...state.friends, action.payload]
      }

    case UNFRIEND:
      return {
        ...state,
        friends: [...state.friends].filter(friend => friend.id !== action.id)
      }

    default:
      return state
  }
}
