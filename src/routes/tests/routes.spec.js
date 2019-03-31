import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import history from 'utilities/history';
import Routes from '../routes';
import store from '../../redux/store';

describe('Routes', () => {
  it('should render without crashing', () => {
    const component = shallow(<Routes history={history} />);
    expect(component.find('Router').exists()).toBe(true);
  });

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
