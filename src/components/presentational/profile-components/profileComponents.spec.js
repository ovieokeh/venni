import React from 'react';
import { mount } from 'enzyme';
import FriendsList from './FriendsList';
import RequestsList from './RequestsList';
import SentRequestsList from './SentRequestsList';

describe('Profile Components', () => {
  describe('FriendsList', () => {
    const props = {
      confirmAction: jest.fn(),
      friends: [{
        id: Math.random(),
        name: 'Good Friend',
        email: 'goodfriend@example.com',
        avatarUrl: 'url',
      }],
    };

    it('renders without crashing', () => {
      const component = mount(<FriendsList {...props} />);
      expect(component.find('.friends-header').exists()).toBe(true);
      expect(component.find('.friend-details').exists()).toBe(false);
    });

    it('handles unfriend', () => {
      const component = mount(<FriendsList {...props} />);
      component.find('.ant-collapse-header').simulate('click');
      const button = component.find('.ant-btn').at(0);
      button.simulate('click');
      component.find('.ant-btn-sm').at(1).simulate('click');

      expect(component.find('.friend').exists()).toBe(true);
      expect(component.find('.friend-details').exists()).toBe(true);
      expect(component.find('Popconfirm').exists()).toBe(true);
      expect(props.confirmAction).toHaveBeenCalled();
    });

    it('renders the Empty component when friends.length === 0', () => {
      props.friends = [];
      const component = mount(<FriendsList {...props} />);

      expect(component.find('Empty').exists()).toBe(true);
      expect(component.find('.ant-empty-description').text()).toEqual('No Friends Yet');
    });
  });

  describe('RequestsList', () => {
    const props = {
      confirmAction: jest.fn(),
      friendRequests: [{
        id: Math.random(),
        name: 'Good Friend',
        email: 'goodfriend@example.com',
        avatarUrl: 'url',
      }],
    };

    it('renders without crashing', () => {
      const component = mount(<RequestsList {...props} />);
      expect(component.find('.request-header').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(false);
    });

    it('handles request decline', () => {
      const component = mount(<RequestsList {...props} />);
      component.find('.ant-collapse-header').simulate('click');
      const button = component.find('.ant-btn').at(0);
      button.simulate('click');
      component.find('.ant-btn-sm').at(1).simulate('click');

      expect(component.find('.request').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(true);
      expect(component.find('Popconfirm').exists()).toBe(true);
      expect(props.confirmAction).toHaveBeenCalled();
    });

    it('handles request accept', () => {
      const component = mount(<RequestsList {...props} />);
      component.find('.ant-collapse-header').simulate('click');
      const button = component.find('.ant-btn').at(1);
      button.simulate('click');
      component.find('.ant-btn-sm').at(1).simulate('click');

      expect(component.find('.request').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(true);
      expect(component.find('Popconfirm').exists()).toBe(true);
      expect(props.confirmAction).toHaveBeenCalled();
    });

    it('renders the Empty component when friendRequests.length === 0', () => {
      props.friendRequests = [];
      const component = mount(<RequestsList {...props} />);

      expect(component.find('Empty').exists()).toBe(true);
      expect(component.find('.ant-empty-description').text()).toEqual('No Friend Requests');
    });
  });

  describe('SentRequestsList', () => {
    const props = {
      confirmAction: jest.fn(),
      sentRequests: [{
        id: Math.random(),
        name: 'Good Friend',
        email: 'goodfriend@example.com',
        avatarUrl: 'url',
      }],
    };

    it('renders without crashing', () => {
      const component = mount(<SentRequestsList {...props} />);
      expect(component.find('.request-header').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(false);
    });

    it('handles request cancel', () => {
      const component = mount(<SentRequestsList {...props} />);
      component.find('.ant-collapse-header').simulate('click');
      const button = component.find('.ant-btn').at(0);
      button.simulate('click');
      component.find('.ant-btn-sm').at(1).simulate('click');

      expect(component.find('.request').exists()).toBe(true);
      expect(component.find('.requester-details').exists()).toBe(true);
      expect(component.find('Popconfirm').exists()).toBe(true);
      expect(props.confirmAction).toHaveBeenCalled();
    });

    it('renders the Empty component when sentRequests.length === 0', () => {
      props.sentRequests = [];
      const component = mount(<SentRequestsList {...props} />);

      expect(component.find('Empty').exists()).toBe(true);
      expect(component.find('.ant-empty-description').text()).toEqual('No Pending Sent Requests');
    });
  });
});
