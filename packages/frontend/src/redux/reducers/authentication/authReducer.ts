import {
  AuthTypes,
  AuthState,
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT
} from '../../types'
import { hydrate } from 'src/utilities'

const emptyState = { isLoading: false, token: '', error: '' }
const initialState: AuthState = hydrate('auth', emptyState)

export function authReducer(
  state: AuthState = initialState,
  action: AuthTypes
): AuthState {
  switch (action.type) {
    case AUTH_BEGIN:
      return {
        isLoading: true,
        token: '',
        error: ''
      }

    case AUTH_SUCCESS:
      return {
        isLoading: false,
        token: action.data,
        error: ''
      }

    case AUTH_ERROR:
      return {
        isLoading: false,
        token: '',
        error: action.error
      }

    case LOGOUT:
      window.localStorage.clear()
      window.location.reload()
      return emptyState

    default:
      return state
  }
}
