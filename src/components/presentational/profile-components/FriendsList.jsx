import React from 'react';
import {
  Collapse, Button, Popconfirm, Icon,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';

function FriendsList({ friends, confirmAction }) {
  const { Panel } = Collapse;
  const ButtonGroup = Button.Group;

  if (!friends.length) {
    return (
      <Empty
        description="No Friends Yet"
      />
    );
  }

  return (
    <Collapse bordered={false}>
      {
        friends.map(friend => (
          <Panel
            header={(
              <span className="friends-header">
                <img
                  className="image-30"
                  src={friend.avatarUrl}
                  alt={friend.name}
                />
                <span>{friend.name}</span>
              </span>
            )}
            key={friend.id}
          >
            <div className="friend">
              <div className="friend-details">
                <img
                  className="image-150"
                  src={friend.avatarUrl}
                  alt={friend.name}
                />
                <p>{friend.name}</p>
                <p>{friend.email}</p>
              </div>
              <ButtonGroup className="friend-actions">
                <Popconfirm
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  onConfirm={() => confirmAction({
                    friendId: friend.id,
                    friendName: friend.name,
                    type: 'confirm-unfriend',
                  })}
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
          </Panel>
        ))
      }
    </Collapse>
  );
}

FriendsList.propTypes = {
  friends: propTypes.instanceOf(Object).isRequired,
  confirmAction: propTypes.func.isRequired,
};

export default FriendsList;
