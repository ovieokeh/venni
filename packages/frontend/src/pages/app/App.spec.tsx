import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App Tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find('h2').text()).toEqual('Content coming soon...')
  })
})
