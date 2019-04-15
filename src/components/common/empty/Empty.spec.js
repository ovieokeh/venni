import React from 'react';
import { mount } from 'enzyme';
import Empty from './Empty';

describe('Empty', () => {
  it('should render without crashing', () => {
    const component = mount(<Empty description="This is a test" />);
    expect(component.find('.no-data').exists()).toBe(true);
  });
});
