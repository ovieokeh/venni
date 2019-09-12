import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Error from './Error'

describe('Error Page', () => {
  let wrapper: ShallowWrapper
  const history: any = { goBack: jest.fn() }

  beforeAll(() => {
    wrapper = shallow(<Error history={history} />)
  })

  it('should render without crashing', () => {
    expect(wrapper.find('.notfound').exists()).toBe(true)
    expect(wrapper.find('.notfound__main__h3').text()).toEqual(
      'An Error Occurred!'
    )
    expect(wrapper.find('.notfound__main__p').text()).toEqual(
      "The page you're looking for doesn't exist or some other error occurred."
    )
  })

  it('should handle the back button click', () => {
    wrapper.find('Button').simulate('click')

    expect(history.goBack).toHaveBeenCalled()
  })
})
