import React from 'react';
import shallow from 'enzyme/shallow';
import Homepage from './Homepage';

describe('Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<Homepage />);

    expect(component.find('.homepage').exists()).toBe(true);
    expect(component.find('.image-container').exists()).toBe(true);
    expect(component.find('.main').exists()).toBe(true);
  });
});
