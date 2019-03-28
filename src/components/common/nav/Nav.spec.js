import React from 'react';
import shallow from 'enzyme/shallow';
import Nav from './Nav';

describe('Nav', () => {
  it('should render without crashing', () => {
    const component = shallow(<Nav />);

    expect(component.find('.navi').exists()).toBe(true);
    expect(component.find('.navi-brand').exists()).toBe(true);
  });
});
