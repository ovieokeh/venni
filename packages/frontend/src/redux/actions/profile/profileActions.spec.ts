import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import * as actions from './profileActions'
import * as types from '../../types'

jest.mock('axios')

interface ExpectedAction {
  type: string
  profile?: any
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const expectedAction: ExpectedAction = {
  type: ''
}
const userProfile = {
  id: 'someid',
  name: 'Buzz Lightyear',
  email: 'buzz@lightyear.com',
  avatar: 'someurl',
  createdAt: new Date()
}

describe('Profile actions', () => {
  it('should handle GET_USER_PROFILE_SUCCESS', () => {
    expectedAction.type = types.GET_USER_PROFILE_SUCCESS
    expectedAction.profile = userProfile
    expect(actions.getProfileSuccess(userProfile)).toEqual(expectedAction)
  })
})

describe('async Profile actions', () => {
  it('should dispatch the required actions when profile request is successful', () => {
    const successResponse = { data: userProfile, message: 'profile retrieved' }
    ;(axios as any).get.mockImplementation((url: string) => {
      return url === 'http://localhost:3200/api//profile'
        ? Promise.resolve({ data: successResponse })
        : Promise.resolve({ data: { data: [] } })
    })

    const expectedActions = [
      { type: types.GET_USER_PROFILE_SUCCESS, profile: userProfile },
      { type: types.GET_INVITES_SUCCESS, allInvites: [] }
    ]

    const store = mockStore({ auth: { token: '' } })

    store.dispatch(actions.getProfileRequest() as any).then((res: boolean) => {
      expect(res).toBe(true)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should dispatch the required actions when profile request errors out', () => {
    ;(axios as any).get.mockImplementationOnce(() =>
      Promise.reject({ data: {} })
    )

    const store = mockStore({ auth: { token: '' } })

    store.dispatch(actions.getProfileRequest() as any).then((res: boolean) => {
      expect(res).toBe(false)
      expect(store.getActions().length).toBe(0)
    })
  })
})
