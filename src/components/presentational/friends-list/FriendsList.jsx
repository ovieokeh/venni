import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Popconfirm, Icon, message,
  Input,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';
import { unfriendUserRequest, sendFriendInvite } from 'actions/invites/invitesActions';
import './FriendsList.less';

function FriendsList({ friends, unfriend, invite }) {
  const [inviteInput, setInviteInput] = useState('');
  const ButtonGroup = Button.Group;

  const unfriendUser = async (email) => {
    try {
      const response = await unfriend(email);
      message.success(response);
    } catch (error) {
      message.error(error.message);
    }
  };

  const sendInvite = async () => {
    try {
      const response = await invite(inviteInput);
      message.success(response);

      setInviteInput('');
    } catch (error) {
      message.error(error.message);
    }
  };

  const renderContent = () => {
    if (!friends.length) {
      return (
        <Empty
          description="No Friends Yet"
        />
      );
    }

    return friends.map(friend => (
      <div key={friend.id} className="friend">
        <div className="friend-intro">
          <img
            className="friend-picture"
            src={friend.avatarUrl}
            alt={friend.name}
          />
          <div className="friend-details">
            <p className="friend-name">{friend.name}</p>
            <p className="friend-email">{friend.email}</p>
          </div>
        </div>
        <div className="friend-actions">
          <ButtonGroup className="friend-actions">
            <Popconfirm
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => unfriendUser(friend.email)}
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
  };

  return (
    <div className="friends-list-container">
      <div className="invite-container">
        <Input
          type="email"
          placeholder="invite a friend by email"
          value={inviteInput}
          onChange={event => setInviteInput(event.target.value)}
          onPressEnter={() => sendInvite()}
          size="large"
          allowClear
        />
        <Button
          className="send-invite-btn"
          onClick={() => sendInvite()}
          size="large"
        >
          <Icon
            className="invite-icon"
            type="plus-circle"
          />
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}

FriendsList.propTypes = {
  friends: propTypes.instanceOf(Object).isRequired,
  unfriend: propTypes.func.isRequired,
  invite: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  invite: email => dispatch(sendFriendInvite(email)),
  unfriend: friendId => dispatch(unfriendUserRequest(friendId)),
});

const ConnectedFriendsList = connect(null, mapDispatchToProps)(FriendsList);

export default ConnectedFriendsList;
