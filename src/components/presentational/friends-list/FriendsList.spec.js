import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import FriendsList from './FriendsList';

const mockStore = configureStore([thunk]);

describe('FriendsList', () => {
  const store = mockStore({});
  const props = {
    friends: [{
      id: Math.random(),
      name: 'Good Friend',
      email: 'goodfriend@example.com',
      avatarUrl: 'url',
    }],
  };

  it('renders without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <FriendsList {...props} />
      </Provider>,
    );

    expect(component.find('.friend').exists()).toBe(true);
    expect(component.find('.friend-details').exists()).toBe(true);
  });

  it('handles unfriend', () => {
    const component = mount(
      <Provider store={store}>
        <FriendsList {...props} />
      </Provider>,
    );

    const button = component.find('.ant-btn-danger');
    button.simulate('click');
    component.find('.ant-btn-sm').at(1).simulate('click');

    expect(component.find('.friend').exists()).toBe(true);
    expect(component.find('.friend-details').exists()).toBe(true);
    expect(component.find('Popconfirm').exists()).toBe(true);
  });

  it('handles sendInvite', () => {
    const component = mount(
      <Provider store={store}>
        <FriendsList {...props} />
      </Provider>,
    );

    const input = component.find('input').at(0);
    input.simulate('change', {
      target: { value: 'dummy@example.com' },
    });

    component.find('.send-invite-btn').at(0).simulate('click');
  });

  it('renders the Empty component when friends.length === 0', () => {
    props.friends = [];
    const component = mount(
      <Provider store={store}>
        <FriendsList {...props} />
      </Provider>,
    );

    expect(component.find('Empty').exists()).toBe(true);
    expect(component.find('.ant-empty-description').text()).toEqual('No Friends Yet');
  });
});
