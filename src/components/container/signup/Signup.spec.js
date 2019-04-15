import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import mockAxios from 'axios';
import * as actions from 'actions/authentication/authActions';
import store from 'store/store';
import Signup from './Signup';

jest.spyOn(actions, 'signupRequest');
mockAxios.post.mockImplementation(() => Promise.resolve({
  data: { data: 'token', message: 'signup successful' },
}));

describe('Signup', () => {
  const mockStore = configureStore();
  const history = {
    push: jest.fn(),
  };

  it('should render without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Signup history={history} />
        </MemoryRouter>
      </Provider>,
    );

    expect(component.find('.signup-container').exists()).toBe(true);
    expect(component.find('.form-container').exists()).toBe(true);
  });

  it('form should catch input errors', () => {
    const fakeStore = mockStore({});
    const event = {
      preventDefault: jest.fn(),
    };
    const component = mount(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Signup history={history} />
        </MemoryRouter>
      </Provider>,
    );

    const Form = component.find('Form');
    Form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(fakeStore.getActions().length).toBe(0);
  });

  it('form should submit successfully', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Signup history={history} />
        </MemoryRouter>
      </Provider>,
    );

    component.find('#signup_form_name').at(1).simulate('change', {
      target: { value: 'Test User' },
    });
    component.find('#signup_form_email').at(1).simulate('change', {
      target: { value: 'test@example.com' },
    });
    component.find('#signup_form_password').at(2).simulate('change', {
      target: { value: 'password1' },
    });

    const Form = component.find('Form');
    Form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(actions.signupRequest).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password1',
    });
  });

  it('form should handle failures', () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    mockAxios.post.mockImplementation(() => Promise.reject({
      response: { data: { message: 'failed' } },
    }));
    const event = {
      preventDefault: jest.fn(),
    };
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Signup history={history} />
        </MemoryRouter>
      </Provider>,
    );

    component.find('#signup_form_name').at(1).simulate('change', {
      target: { value: 'Test User' },
    });
    component.find('#signup_form_email').at(1).simulate('change', {
      target: { value: 'test@example.com' },
    });
    component.find('#signup_form_password').at(2).simulate('change', {
      target: { value: 'password1' },
    });

    const Form = component.find('Form');
    Form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(actions.signupRequest).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password1',
    });
  });
});
