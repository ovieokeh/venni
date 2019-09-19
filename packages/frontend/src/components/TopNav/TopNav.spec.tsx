import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { TopNav } from './TopNav'

describe('TopNav Tests', () => {
  let wrapper: ShallowWrapper
  const props: any = {
    history: {
      location: { pathname: '/' },
      listen: jest.fn(fn => fn({ pathname: '/login' })),
      push: jest.fn()
    },
    authState: {
      isLoading: false,
      token: '',
      error: ''
    },
    userProfile: {
      name: 'Buzz Lightyear',
      avatarUrl: 'imageurl.com'
    },
    social: {
      friends: [],
      receivedInvites: [],
      sentInvites: []
    },
    currentLocation: '/'
  }

  beforeAll(() => {
    wrapper = shallow(<TopNav {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find('Menu').exists()).toBe(true)
    expect(wrapper.state('current')).toEqual('/')
  })

  it('renders different links when signed in', () => {
    wrapper.setProps({
      authState: { ...props.authState, token: 'somerandomtoken' }
    })
    const authLink = wrapper.find('Avatar')
    expect(authLink.props().children).toEqual(props.userProfile.name)
  })

  it('handles click events', () => {
    const menu = wrapper.find('Menu')
    menu.simulate('click', { key: '/signup' })
    expect(wrapper.state('current')).toEqual('/signup')
  })
})
