import axios from 'axios'
import { Dispatch } from 'redux'
import { UserProfile, GET_USER_PROFILE_SUCCESS } from 'src/redux/types'

export const getProfileSuccess = (profile: UserProfile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  profile
})

export const getProfileRequest = () => async (
  dispatch: Dispatch,
  getState: Function
): Promise<boolean> => {
  const url = `${process.env.REACT_APP_API_URL}/profile`
  const { token } = getState().auth

  return axios
    .get(url, { headers: { authorization: token } })
    .then(response => {
      dispatch(getProfileSuccess(response.data.data))
      return true
    })
    .catch(() => false)
}
