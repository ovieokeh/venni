import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount, ReactWrapper } from 'enzyme'
import { WrappedLoginForm } from './Login'

describe('Login Tests', () => {
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
    login: jest.fn(() => true)
  }

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <WrappedLoginForm {...(props as any)} />
      </MemoryRouter>
    )

    instance = wrapper.find('LoginForm').instance()

    handleErrorsSpy = jest.spyOn(instance, 'handleErrors')
  })

  it('renders without crashing', () => {
    expect(wrapper.find('.login').exists()).toBe(true)
  })

  it('should handle successful form submissions', () => {
    const event = { preventDefault: jest.fn() }

    const emailInput = wrapper.find('#login_email').at(1)
    const pwInput = wrapper.find('#login_password').at(1)
    const form = wrapper.find('Form')

    emailInput.simulate('change', { target: { value: 'buzz@lightyear.com' } })
    pwInput.simulate('change', { target: { value: 'password1' } })
    form.simulate('submit', event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(props.login).toHaveBeenCalledWith({
      email: 'buzz@lightyear.com',
      password: 'password1',
      remember: true
    })
    expect(handleErrorsSpy).not.toHaveBeenCalled()
  })

  it('should handle multiple errors', () => {
    const newProps: any = {
      ...props,
      login: jest.fn(() => false),
      authState: {
        ...props.authState,
        error: [{ param: 'email', msg: 'an error occurred' }]
      }
    }
    const wrapper = mount(
      <MemoryRouter>
        <WrappedLoginForm {...newProps} />
      </MemoryRouter>
    )

    const event = { preventDefault: jest.fn() }

    const emailInput = wrapper.find('#login_email').at(1)
    const pwInput = wrapper.find('#login_password').at(1)
    const form = wrapper.find('Form')

    emailInput.simulate('change', { target: { value: 'buzz@lightyear.com' } })
    pwInput.simulate('change', { target: { value: 'password1' } })
    form.simulate('submit', event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(props.login).toHaveBeenCalledWith({
      email: 'buzz@lightyear.com',
      password: 'password1',
      remember: true
    })
  })

  it('should handle a single error', () => {
    const newProps: any = { ...props, login: jest.fn(() => false) }
    const wrapper = mount(
      <MemoryRouter>
        <WrappedLoginForm {...newProps} />
      </MemoryRouter>
    )

    const event = { preventDefault: jest.fn() }

    const emailInput = wrapper.find('#login_email').at(1)
    const pwInput = wrapper.find('#login_password').at(1)
    const form = wrapper.find('Form')

    emailInput.simulate('change', { target: { value: 'buzz@lightyear.com' } })
    pwInput.simulate('change', { target: { value: 'password1' } })
    form.simulate('submit', event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(props.login).toHaveBeenCalledWith({
      email: 'buzz@lightyear.com',
      password: 'password1',
      remember: true
    })
  })
})
