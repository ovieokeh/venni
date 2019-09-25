import {
  ProfileTypes,
  UserProfile,
  GET_USER_PROFILE_SUCCESS
} from '../../types'

const initialState: UserProfile = {
  id: '',
  name: '',
  email: '',
  avatar: '',
  createdAt: null
}

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
