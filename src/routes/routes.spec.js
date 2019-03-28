import React from 'react';
import shallow from 'enzyme/shallow';
import history from 'utilities/history';
import Routes from './routes';

describe('Routes', () => {
  it('should render without crashing', () => {
    const component = shallow(<Routes history={history} />);
    expect(component.find('Router').exists()).toBe(true);
  });
});
