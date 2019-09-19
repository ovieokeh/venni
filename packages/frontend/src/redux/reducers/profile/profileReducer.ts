import {
  ProfileTypes,
  UserProfile,
  GET_USER_PROFILE_SUCCESS
} from '../../types'
import hydrate from 'src/utilities/hydrate'

const emptyState = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
  createdAt: null
}
const initialState = hydrate('profile', emptyState)

export function profileReducer(
  state = initialState,
  action: ProfileTypes
): UserProfile {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      return action.profile

    default:
      return state
  }
}
