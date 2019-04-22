import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import store from 'store/store';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AllUsers from './AllUsers';

const mockStore = configureStore([thunk]);

describe('AllUsers', () => {
  const fakestore = mockStore({});
  const users = [{
    id: Math.random(),
    name: 'Test User',
    email: 'testuser@example.com',
    avatarUrl: 'https://fakeimageurl.com',
    friends: [],
    sentRequests: [],
  }];

  it('should render empty when users = []', () => {
    const component = mount(
      <Provider store={fakestore}>
        <AllUsers users={[]} />
      </Provider>,
    );

    expect(component.find('.no-data').exists()).toBe(true);
    expect(component.find('.user').exists()).toBe(false);
  });

  it('should render without crashing', () => {
    const component = mount(
      <Provider store={fakestore}>
        <AllUsers users={users} />
      </Provider>,
    );

    expect(component.find('.user').exists()).toBe(true);
  });

  it('should handle send request click', () => {
    const component = mount(
      <Provider store={store}>
        <AllUsers users={users} />
      </Provider>,
    );

    component.find('.send-request').at(0).simulate('click');
    expect(component.find('.user').exists()).toBe(true);
  });
});
