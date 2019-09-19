import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { FriendsList } from './FriendsList'
import { UserProfile } from 'src/redux/types'

describe('FriendsList tests', () => {
  let wrapper: ShallowWrapper
  const props: any = {
    friends: [],
    unfriend: jest.fn(),
    invite: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<FriendsList {...props} />)
  })

  it('renders Empty when friends.length is 0', () => {
    expect(wrapper.find('EmptyContainer').exists()).toBe(true)
    expect((wrapper.find('EmptyContainer') as any).props().description).toEqual(
      'No Friends Yet'
    )
  })

  it('renders friends when they exist', () => {
    wrapper.setProps({
      friends: [
        {
          name: 'Woody',
          email: 'woody@toys.com',
          id: 'someid',
          avatarUrl: 'someurl'
        }
      ]
    })

    expect(wrapper.find('.friend').exists()).toBe(true)
    console.log(wrapper)
  })
})
