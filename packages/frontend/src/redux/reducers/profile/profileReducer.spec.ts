import { profileReducer } from './profileReducer'
import { GET_USER_PROFILE_SUCCESS } from 'src/redux/types'

const initialState: any = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
  createdAt: null,
  friends: [],
  friendInvites: [],
  sentInvites: []
}

const profile = {
  id: 'someid',
  name: 'Buzz Lightyear',
  email: 'buzz@lightyear.com',
  avatarUrl: 'someurl',
  createdAt: new Date()
}

describe('Profile reducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle GET_USER_PROFILE_SUCCESS', () => {
    const newState = { ...initialState, ...profile }

    expect(
      profileReducer(undefined, { type: GET_USER_PROFILE_SUCCESS, profile })
    ).toEqual(newState)
  })
})
