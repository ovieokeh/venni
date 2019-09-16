import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Drawer } from './Drawer'

describe('Drawer tests', () => {
  let wrapper: ShallowWrapper
  const props = {
    showDrawer: false,
    hideDrawer: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<Drawer {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find('.drawer').exists()).toBe(true)
  })
})
