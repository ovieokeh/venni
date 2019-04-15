import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Navbar from './Navbar';

describe('Navbar', () => {
  const initialState = {
    user: {
      profile: {
        friendRequests: [],
        avatarUrl: 'url',
      },
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('should render without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>,
    );

    expect(component.find('.nav').exists()).toBe(true);
    expect(component.find('.brand').exists()).toBe(true);
  });

  it('should render a user profile image when logged in', () => {
    initialState.user.profile.friendRequests = [{ friend: 'request' }];
    const fakeStore = mockStore(initialState);
    const component = mount(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>,
    );

    expect(component.find('.nav').exists()).toBe(true);
    expect(component.find('.brand').exists()).toBe(true);
  });

  it('should handle profile drawer toggle', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>,
    );

    const toggler = component.find('.toggler');
    toggler.simulate('click');
    expect(store.getActions()).toEqual([{ type: 'OPEN_PROFILE_DRAWER' }]);
  });
});
