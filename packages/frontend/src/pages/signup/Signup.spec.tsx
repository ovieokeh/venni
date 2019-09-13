import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount, ReactWrapper } from 'enzyme'
import { WrappedSignupForm } from './Signup'

describe('Signup Tests', () => {
  let wrapper: ReactWrapper
  let instance: any
  let handleErrorsSpy: any

  const props = {
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
    signup: jest.fn(() => true)
  }

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <WrappedSignupForm {...(props as any)} />
      </MemoryRouter>
    )

    instance = wrapper.find('SignupForm').instance()
    handleErrorsSpy = jest.spyOn(instance, 'handleErrors')
  })

  it('renders without crashing', () => {
    expect(wrapper.find('.signup').exists()).toBe(true)
  })

  it('should handle successful form submissions', () => {
    const event = { preventDefault: jest.fn() }

    const nameInput = wrapper.find('#signup_name').at(1)
    const emailInput = wrapper.find('#signup_email').at(1)
    const pwInput = wrapper.find('#signup_password').at(1)
    const form = wrapper.find('Form')

    nameInput.simulate('change', { target: { value: 'Buzz Lightyear' } })
    emailInput.simulate('change', { target: { value: 'buzz@lightyear.com' } })
    pwInput.simulate('change', { target: { value: 'password1' } })
    form.simulate('submit', event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(props.signup).toHaveBeenCalledWith({
      name: 'Buzz Lightyear',
      email: 'buzz@lightyear.com',
      password: 'password1'
    })
    expect(handleErrorsSpy).not.toHaveBeenCalled()
  })

  it('should handle multiple errors', () => {
    const newProps: any = {
      ...props,
      signup: jest.fn(() => false),
      authState: {
        ...props.authState,
        error: [{ param: 'email', msg: 'an error occurred' }]
      }
    }
    const wrapper = mount(
      <MemoryRouter>
        <WrappedSignupForm {...newProps} />
      </MemoryRouter>
    )

    const event = { preventDefault: jest.fn() }

    const nameInput = wrapper.find('#signup_name').at(1)
    const emailInput = wrapper.find('#signup_email').at(1)
    const pwInput = wrapper.find('#signup_password').at(1)
    const form = wrapper.find('Form')

    nameInput.simulate('change', { target: { value: 'Buzz Lightyear' } })
    emailInput.simulate('change', { target: { value: 'buzz@lightyear.com' } })
    pwInput.simulate('change', { target: { value: 'password1' } })
    form.simulate('submit', event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(props.signup).toHaveBeenCalledWith({
      name: 'Buzz Lightyear',
      email: 'buzz@lightyear.com',
      password: 'password1'
    })
  })

  it('should handle a single error', () => {
    const newProps: any = { ...props, signup: jest.fn(() => false) }
    const wrapper = mount(
      <MemoryRouter>
        <WrappedSignupForm {...newProps} />
      </MemoryRouter>
    )

    const event = { preventDefault: jest.fn() }

    const nameInput = wrapper.find('#signup_name').at(1)
    const emailInput = wrapper.find('#signup_email').at(1)
    const pwInput = wrapper.find('#signup_password').at(1)
    const form = wrapper.find('Form')

    nameInput.simulate('change', { target: { value: 'Buzz Lightyear' } })
    emailInput.simulate('change', { target: { value: 'buzz@lightyear.com' } })
    pwInput.simulate('change', { target: { value: 'password1' } })
    form.simulate('submit', event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(props.signup).toHaveBeenCalledWith({
      name: 'Buzz Lightyear',
      email: 'buzz@lightyear.com',
      password: 'password1'
    })
    expect(handleErrorsSpy).not.toHaveBeenCalled()
  })
})
