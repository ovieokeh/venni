import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import mount from 'enzyme/mount';
import configureStore from 'redux-mock-store';
import Navbar from './Navbar';

describe('Navbar', () => {
  const mockStore = configureStore();

  it('should render without crashing', () => {
    const store = mockStore({ auth: { token: null } });
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
    const store = mockStore({ auth: { token: 'something' } });
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
});
