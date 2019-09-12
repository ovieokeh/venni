import { authReducer } from './authReducer'
import { AUTH_SUCCESS, AUTH_ERROR, AUTH_BEGIN } from 'src/redux/types'

const initialState = {
  isLoading: false,
  token: '',
  error: ''
}

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle AUTH_BEGIN', () => {
    initialState.isLoading = true
    expect(authReducer(undefined, { type: AUTH_BEGIN })).toEqual(initialState)
  })

  it('should handle AUTH_SUCCESS', () => {
    initialState.isLoading = false
    initialState.token = 'somerandomtoken'

    expect(
      authReducer(undefined, { type: AUTH_SUCCESS, data: 'somerandomtoken' })
    ).toEqual(initialState)
  })

  it('should handle AUTH_ERROR', () => {
    initialState.isLoading = false
    initialState.token = ''
    initialState.error = 'some nasty error'

    expect(
      authReducer(undefined, { type: AUTH_ERROR, error: 'some nasty error' })
    ).toEqual(initialState)
  })
})
