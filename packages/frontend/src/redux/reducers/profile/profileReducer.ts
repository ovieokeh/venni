import {
  ProfileTypes,
  ProfileState,
  GET_USER_PROFILE_SUCCESS
} from '../../types'
import { hydrate } from 'src/utilities'

const emptyState: ProfileState = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
  createdAt: null,
  friends: [],
  friendInvites: [],
  sentInvites: []
}
const initialState: ProfileState = hydrate('profile', emptyState)

export function profileReducer(
  state: ProfileState = initialState,
  action: ProfileTypes
): ProfileState {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...action.profile,
        friends: [],
        friendInvites: [],
        sentInvites: []
      }

    default:
      return state
  }
}
