import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './App';

describe('App', () => {
  const profile = {
    id: Math.random(),
    name: 'Test User',
    email: 'testuser@example.com',
    avatarUrl: 'https://fakeimageurl.com',
  };

  const user = {
    profile,
    friends: [profile],
    friendInvites: [],
    sentInvites: [],
  };

  const mockStore = configureStore([thunk]);
  const initialState = {
    user,
  };
  const store = mockStore(initialState);

  it('renders without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(component.find('.app-container').exists()).toBe(true);
  });

  it('should handle menu item click', () => {
    const component = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const instance = component.find('App').instance();

    component.find('.friends-menu-item').at(0).simulate('click');
    expect(instance.state.currentlySelected).toEqual('friends');
  });
});
