import {
  AuthTypes,
  AuthState,
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../../types'

let initialState: AuthState
const emptyState = { isLoading: false, token: '', error: '' }

try {
  const remember = localStorage.getItem('remember')
  const store = localStorage.getItem('store') as string

  initialState = remember === 'yes' ? JSON.parse(store).auth : emptyState
} catch (error) {
  initialState = emptyState
}

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

    default:
      return state
  }
}
