import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Icon, message,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';
import { sendFriendRequest } from 'actions/requests/requestsActions';
import { getUsersRequest } from 'actions/users/usersActions';

function AllUsers({ users, friend, getAllUsers }) {
  const sendRequest = async (friendId) => {
    try {
      await friend(friendId);
      message.success('Friend request sent successfully');
      await getAllUsers();
    } catch (error) {
      message.warn('An error occurred');
    }
  };

  if (!users.length) {
    return (
      <Empty
        description="No Users Yet"
      />
    );
  }

  return users.map(user => (
    <div key={user.id} className="user">
      <img
        className="user-picture"
        src={user.avatarUrl}
        alt={user.name}
      />
      <div className="user-details">
        <p className="user-name">{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div className="user-actions">
        <Button
          className="send-request"
          onClick={() => sendRequest(user.id)}
          type="primary"
        >
          <span className="inline-horizontal">
            <Icon type="plus" />
            Add Friend
          </span>
        </Button>
      </div>
    </div>
  ));
}

AllUsers.propTypes = {
  users: propTypes.instanceOf(Object).isRequired,
  friend: propTypes.func.isRequired,
  getAllUsers: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  friend: friendId => dispatch(sendFriendRequest(friendId)),
  getAllUsers: () => dispatch(getUsersRequest()),
});

const ConnectedAllUsers = connect(null, mapDispatchToProps)(AllUsers);

export default ConnectedAllUsers;
