import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './App';

describe('App', () => {
  const mockStore = configureStore([thunk]);
  const initialState = {
    user: {
      profile: {
        name: 'Test User',
      },
    },
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
});
