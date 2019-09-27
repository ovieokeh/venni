import {
  ProfileTypes,
  GET_USER_PROFILE_SUCCESS,
  UserProfile
} from '../../types'
import hydrate from 'src/utilities/hydrate'

const emptyState: UserProfile = {
  id: '',
  name: '',
  email: '',
  avatar: '',
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
