import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

describe('App Tests', () => {
  const props: any = {
    loadProfile: jest.fn(),
    user: {
      id: 'somerandomid',
      name: 'Buzz Lightyear',
      email: 'buzz@lightyear',
      avatar: 'someurl',
      createdAt: new Date()
    },
    social: {
      friends: [],
      receivedInvites: [],
      sentInvites: []
    },
    isSidebarCollapsed: false
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<App {...props} />)

    expect(wrapper.find('.app').exists()).toBe(true)
  })
})
