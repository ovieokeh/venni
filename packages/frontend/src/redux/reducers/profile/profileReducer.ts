import {
  ProfileTypes,
  ProfileState,
  GET_USER_PROFILE_SUCCESS
} from '../../types'
import hydrate from 'src/utilities/hydrate'

const emptyState = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
  createdAt: null,
  friends: [],
  friendInvites: [],
  sentInvites: []
}
const initialState = hydrate('profile', emptyState)

export function profileReducer(
  state = initialState,
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
