import React from 'react';
import { mount } from 'enzyme';
import InvitesList from './InvitesList';
import SentInvitesList from './SentInvitesList';

describe('Profile Components', () => {
  describe('InvitesList', () => {
    const props = {
      confirmAction: jest.fn(),
      friendInvites: [{
        id: Math.random(),
        name: 'Good Friend',
        email: 'goodfriend@example.com',
        avatarUrl: 'url',
      }],
    };

    it('renders without crashing', () => {
      const component = mount(<InvitesList {...props} />);
      expect(component.find('.invite-header').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(false);
    });

    it('handles invite decline', () => {
      const component = mount(<InvitesList {...props} />);
      component.find('.ant-collapse-header').simulate('click');
      const button = component.find('.ant-btn').at(0);
      button.simulate('click');
      component.find('.ant-btn-sm').at(1).simulate('click');

      expect(component.find('.invite').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(true);
      expect(component.find('Popconfirm').exists()).toBe(true);
      expect(props.confirmAction).toHaveBeenCalled();
    });

    it('handles invite accept', () => {
      const component = mount(<InvitesList {...props} />);
      component.find('.ant-collapse-header').simulate('click');
      const button = component.find('.ant-btn').at(1);
      button.simulate('click');
      component.find('.ant-btn-sm').at(1).simulate('click');

      expect(component.find('.invite').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(true);
      expect(component.find('Popconfirm').exists()).toBe(true);
      expect(props.confirmAction).toHaveBeenCalled();
    });

    it('renders the Empty component when friendInvites.length === 0', () => {
      props.friendInvites = [];
      const component = mount(<InvitesList {...props} />);

      expect(component.find('Empty').exists()).toBe(true);
      expect(component.find('.ant-empty-description').text()).toEqual('No Friend Invites');
    });
  });

  describe('SentInvitesList', () => {
    const props = {
      confirmAction: jest.fn(),
      sentInvites: [{
        id: Math.random(),
        name: 'Good Friend',
        email: 'goodfriend@example.com',
        avatarUrl: 'url',
      }],
    };

    it('renders without crashing', () => {
      const component = mount(<SentInvitesList {...props} />);
      expect(component.find('.invite-header').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(false);
    });

    it('handles invite cancel', () => {
      const component = mount(<SentInvitesList {...props} />);
      component.find('.ant-collapse-header').simulate('click');
      const button = component.find('.ant-btn').at(0);
      button.simulate('click');
      component.find('.ant-btn-sm').at(1).simulate('click');

      expect(component.find('.invite').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(true);
      expect(component.find('Popconfirm').exists()).toBe(true);
      expect(props.confirmAction).toHaveBeenCalled();
    });

    it('renders the Empty component when sentInvites.length === 0', () => {
      props.sentInvites = [];
      const component = mount(<SentInvitesList {...props} />);

      expect(component.find('Empty').exists()).toBe(true);
      expect(component.find('.ant-empty-description').text()).toEqual('No Pending Sent Invites');
    });
  });
});
