import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import mockAxios from 'axios';
import * as actions from 'actions/authentication/authActions';
import store from 'store/store';
import Login from './Login';

jest.spyOn(actions, 'loginRequest');
mockAxios.post.mockImplementation(() => Promise.resolve({
  data: { data: 'token', message: 'login successful' },
}));

describe('Login', () => {
  const mockStore = configureStore();
  const history = {
    push: jest.fn(() => true),
  };

  it('should render without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login history={history} />
        </MemoryRouter>
      </Provider>,
    );

    expect(component.find('.login-container').exists()).toBe(true);
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
          <Login history={history} />
        </MemoryRouter>
      </Provider>,
    );

    const Form = component.find('Form');
    Form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(fakeStore.getActions().length).toBe(0);
  });

  it('form should submit successfully', async () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login history={history} />
        </MemoryRouter>
      </Provider>,
    );

    component.find('#login_form_email').at(1).simulate('change', {
      target: { value: 'test@example.com' },
    });
    component.find('#login_form_password').at(2).simulate('change', {
      target: { value: 'password1' },
    });

    const Form = component.find('Form');
    await Form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(actions.loginRequest).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password1',
      remember: false,
    });
  });

  it('form should remember user', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login history={history} />
        </MemoryRouter>
      </Provider>,
    );

    component.find('#login_form_email').at(1).simulate('change', {
      target: { value: 'test@example.com' },
    });
    component.find('#login_form_password').at(2).simulate('change', {
      target: { value: 'password1' },
    });
    component.find('#login_form_remember').at(2).simulate('change', {
      target: { checked: true },
    });

    const Form = component.find('Form');
    Form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(actions.loginRequest).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password1',
      remember: true,
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
          <Login history={history} />
        </MemoryRouter>
      </Provider>,
    );

    component.find('#login_form_email').at(1).simulate('change', {
      target: { value: 'test@example.com' },
    });
    component.find('#login_form_password').at(2).simulate('change', {
      target: { value: 'password1' },
    });
    component.find('#login_form_remember').at(2).simulate('change', {
      target: { checked: true },
    });

    const Form = component.find('Form');
    Form.simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(actions.loginRequest).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password1',
      remember: true,
    });
  });
});
