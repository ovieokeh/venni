import React from 'react'
import { shallow } from 'enzyme'
import Homepage from './Homepage'

describe('Homepage Tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Homepage />)

    expect(wrapper.find('.homepage').exists()).toBe(true)
  })
})
