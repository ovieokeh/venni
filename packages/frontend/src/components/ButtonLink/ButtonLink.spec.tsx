import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ButtonLink, { ButtonLinkProps } from './ButtonLink'
import { history } from 'src/cores/history'

describe('ButtonLink Tests', () => {
  let wrapper: ShallowWrapper

  beforeAll(() => {
    wrapper = shallow(<ButtonLink url="/test" text="btn" />)
  })

  it('renders without crashing', () => {
    const wrapperProps = wrapper.find('Button').props() as ButtonLinkProps

    expect(wrapper.find('Button').exists()).toBe(true)
    expect(wrapperProps.url).toBe('/test')
    expect(wrapperProps.text).toBe('btn')
  })

  it('handles click events', () => {
    const historySpy = jest.spyOn(history, 'push')

    wrapper.find('Button').simulate('click')
    expect(historySpy).toHaveBeenCalledWith('/test')
  })
})
