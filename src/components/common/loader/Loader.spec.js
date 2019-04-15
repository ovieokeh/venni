import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Loader from './Loader';

describe('Loader', () => {
  const mockStore = configureStore();
  const initialState = {
    loader: {
      isLoading: false,
      type: '',
      message: '',
      profileDrawerOpen: false,
    },
    user: {
      profile: null,
    },
  };
  const props = {
    children: [],
  };

  it('should render without crashing', () => {
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Loader {...props} />
      </Provider>,
    );

    expect(component.find('Loader').exists()).toBe(true);
    expect(component.find('Spin').exists()).toBe(true);
  });

  it('should render a spinner when isLoading is true', () => {
    initialState.loader.isLoading = true;

    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Loader {...props} />
      </Provider>,
    );

    expect(component.find('Loader').exists()).toBe(true);
    expect(component.find('.ant-spin-spinning').exists()).toBe(true);
    expect(component.find('.ant-spin-blur').exists()).toBe(true);
  });

  it('should show a notification when type and message are not undefined', () => {
    initialState.loader.isLoading = false;
    initialState.loader.type = 'success';
    initialState.loader.message = 'the operation was successful';

    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Loader {...props} />
      </Provider>,
    );

    expect(component.find('Loader').exists()).toBe(true);
    expect(component.find('.ant-spin-spinning').exists()).toBe(false);
    expect(component.find('.ant-spin-blur').exists()).toBe(false);
  });

  it('should show drawer and close it', () => {
    initialState.loader.profileDrawerOpen = true;
    initialState.user.profile = {
      id: Math.random(),
      name: 'Good Friend',
      email: 'goodfriend@example.com',
      avatarUrl: 'url',
      friends: [],
      friendRequests: [],
      sentRequests: [],
    };

    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Loader {...props} />
      </Provider>,
    );

    component.find('.ant-drawer-close').simulate('click');
    expect(component.find('Drawer').exists()).toBe(true);
    expect(component.find('Profile').exists()).toBe(true);
  });
});
