import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import history from 'utilities/history';
import store from 'store/store';
import Routes from '../Routes';

describe('Routes', () => {
  it('should mount without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <Routes history={history} />
      </Provider>,
    );

    expect(component.find('Router').exists()).toBe(true);
    expect(component.find('Navbar').exists()).toBe(true);
    expect(component.find('Loader').exists()).toBe(true);
  });
});
