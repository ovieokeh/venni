import React from 'react';
import { shallow } from 'enzyme';
import Notfound from './Notfound';

describe('Notfound', () => {
  it('should render without crashing', () => {
    const component = shallow(<Notfound />);

    expect(component.find('.notfound').exists()).toBe(true);
    expect(component.find('Link').exists()).toBe(true);
  });
});
