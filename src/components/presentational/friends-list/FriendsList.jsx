import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Popconfirm, Icon, message,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';
import { unfriendUserRequest } from 'actions/requests/requestsActions';
import './FriendsList.less';

function FriendsList({ friends, unfriend }) {
  const ButtonGroup = Button.Group;

  const unfriendUser = async (id, name) => {
    await unfriend(id);
    message.success(`${name} is no longer your friend`);
  };

  if (!friends.length) {
    return (
      <Empty
        description="No Friends Yet"
      />
    );
  }

  return friends.map(friend => (
    <div key={friend.id} className="friend">
      <img
        className="friend-picture"
        src={friend.avatarUrl}
        alt={friend.name}
      />
      <div className="friend-details">
        <p className="friend-name">{friend.name}</p>
        <p>{friend.email}</p>
      </div>
      <div className="friend-actions">
        <ButtonGroup className="friend-actions">
          <Popconfirm
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => unfriendUser(friend.id, friend.name)}
            title={`Are you sure you want to unfriend ${friend.name}?`}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
            >
              <span className="inline-horizontal">
                <Icon type="user-delete" />
                Unfriend
              </span>
            </Button>
          </Popconfirm>
          <Button
            type="primary"
          >
            <span className="inline-horizontal">
              <Icon type="message" />
              Chat
            </span>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ));
}

FriendsList.propTypes = {
  friends: propTypes.instanceOf(Object).isRequired,
  unfriend: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  unfriend: friendId => dispatch(unfriendUserRequest(friendId)),
});

const ConnectedFriendsList = connect(null, mapDispatchToProps)(FriendsList);

export default ConnectedFriendsList;
