import axios from 'axios'
import {
  AUTH_BEGIN,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AuthBegin,
  AuthError,
  AuthSuccess,
  AuthCredentials,
  AuthErrorResponse
} from '../../types'
import { Dispatch } from 'redux'

export const authBegin = (): AuthBegin => ({ type: AUTH_BEGIN })
export const authSuccess = (token: string): AuthSuccess => ({
  type: AUTH_SUCCESS,
  data: token
})
export const authError = (error: AuthErrorResponse[] | string): AuthError => ({
  type: AUTH_ERROR,
  error
})

export const authRequest = (
  credentials: AuthCredentials,
  type: 'login' | 'signup'
) => async (dispatch: Dispatch) => {
  const url = process.env.REACT_APP_API_URL + '/' + type

  dispatch(authBegin())

  try {
    const response = await axios.post(url, credentials)
    dispatch(authSuccess(response.data.data))

    return true
  } catch (err) {
    const error = err.response.data.data || err.response.data.message

    dispatch(authError(error))
    return false
  }
}
