import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('Logo', () => {
  it('should render without crashing', () => {
    const component = shallow(<Logo />);
    expect(component.find('.logo').exists()).toBe(true);
  });

  it('should apply classes correctly', () => {
    const component = shallow(<Logo fill="white" />);
    expect(component.find('.white').exists()).toBe(true);
  });
});
