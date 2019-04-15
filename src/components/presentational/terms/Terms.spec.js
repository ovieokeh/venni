import React from 'react';
import { shallow } from 'enzyme';
import Terms from './Terms';

describe('Terms', () => {
  it('should render correctly', () => {
    const component = shallow(<Terms />);

    expect(component.find('.terms-container').exists()).toBe(true);
  });
});
