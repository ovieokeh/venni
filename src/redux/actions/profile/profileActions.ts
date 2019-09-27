import { UserProfile, GET_USER_PROFILE_SUCCESS } from 'src/redux/types'

export const getProfileSuccess = (profile: UserProfile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  profile
})
