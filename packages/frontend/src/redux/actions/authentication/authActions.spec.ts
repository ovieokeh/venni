import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import * as actions from './authActions'
import * as types from '../../types'

jest.mock('axios')

interface ExpectedAction {
  type: string
  data?: any
  error?: any
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const expectedAction: ExpectedAction = {
  type: ''
}

describe('Authentication actions', () => {
  it('should handle AUTH_BEGIN', () => {
    expectedAction.type = types.AUTH_BEGIN
    expect(actions.authBegin()).toEqual(expectedAction)
  })

  it('should handle AUTH_SUCCESS', () => {
    expectedAction.type = types.AUTH_SUCCESS
    expectedAction.data = 'somerandomtoken'

    expect(actions.authSuccess('somerandomtoken')).toEqual(expectedAction)
    delete expectedAction.data
  })

  it('should handle AUTH_ERROR', () => {
    expectedAction.type = types.AUTH_ERROR
    expectedAction.error = 'some terrible error'

    expect(actions.authError('some terrible error')).toEqual(expectedAction)
  })
})

describe('async Authentication actions', () => {
  const successResponse = { data: 'token', message: 'successful request' }
  const errorResponse = { response: { data: { data: 'some nasty error' } } }
  const loginCreds = {
    email: 'buzz@lightyear.com',
    password: 'password1'
  }

  it('should dispatch the required actions when auth request is successful', async () => {
    ;(axios as any).post.mockImplementationOnce(() =>
      Promise.resolve({ data: { ...successResponse } })
    )

    const expectedActions = [
      { type: types.AUTH_BEGIN },
      { type: types.AUTH_SUCCESS, data: successResponse.data }
    ]

    const store = mockStore({})

    store
      .dispatch(actions.authRequest(loginCreds, 'login') as any)
      .then((res: boolean) => {
        expect(res).toBe(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should dispatch the required actions when auth request errors', async () => {
    ;(axios as any).post.mockImplementationOnce(() =>
      Promise.reject(errorResponse)
    )

    const expectedActions = [
      { type: types.AUTH_BEGIN },
      { type: types.AUTH_ERROR, error: errorResponse.response.data.data }
    ]

    const store = mockStore({})

    store
      .dispatch(actions.authRequest(loginCreds, 'login') as any)
      .then((res: boolean) => {
        expect(res).toBe(false)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
