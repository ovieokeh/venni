import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import Profile from './Profile';

describe('Profile', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});
  const user = {
    profile: {
      id: Math.random(),
      name: 'Good Friend',
      email: 'goodfriend@example.com',
      avatarUrl: 'url',
    },
    friends: [],
    friendInvites: [],
    sentInvites: [],
  };
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { href: '' },
  });

  it('should render without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <Profile user={user} />
      </Provider>,
    );

    expect(component.find('.profile-container').exists()).toBe(true);
  });


  it('handles logout', () => {
    user.friends = [{
      id: Math.random(),
      name: 'Good Friend',
      email: 'goodfriend@example.com',
      avatarUrl: 'url',
    }];
    user.friendInvites = [{
      id: Math.random(),
      name: 'Good Friend',
      email: 'goodfriend@example.com',
      avatarUrl: 'url',
    }];
    user.sentInvites = [{
      id: Math.random(),
      name: 'Good Friend',
      email: 'goodfriend@example.com',
      avatarUrl: 'url',
    }];
    const component = mount(
      <Provider store={store}>
        <Profile user={user} />
      </Provider>,
    );
    component.find('.ant-collapse-header').simulate('click');
    const button = component.find('.ant-btn').at(0);
    button.simulate('click');
    component.find('.ant-btn-sm').at(1).simulate('click');

    expect(component.find('Popconfirm').exists()).toBe(true);
  });
});
