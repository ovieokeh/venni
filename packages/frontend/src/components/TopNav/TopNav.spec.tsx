import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { TopNav } from './TopNav'

describe('TopNav Tests', () => {
  let wrapper: ShallowWrapper
  const history: any = {
    location: { pathname: '/' },
    listen: jest.fn(fn => fn({ pathname: '/login' })),
    push: jest.fn()
  }
  const authState = {
    isLoading: false,
    token: '',
    error: ''
  }

  beforeAll(() => {
    wrapper = shallow(<TopNav history={history} authState={authState} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find('Menu').exists()).toBe(true)
    expect(wrapper.state('current')).toEqual('/login')
  })

  it('renders different links when signed in', () => {
    wrapper.setProps({ authState: { ...authState, token: 'somerandomtoken' } })

    const authLink = wrapper.find('span')
    expect(authLink.text()).toEqual('Is Auth')
  })

  it('handles click events', () => {
    const menu = wrapper.find('Menu')
    menu.simulate('click', { key: '/signup' })
    expect(wrapper.state('current')).toEqual('/signup')
  })
})
