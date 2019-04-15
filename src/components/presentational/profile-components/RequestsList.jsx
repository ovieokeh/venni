import React from 'react';
import {
  Collapse, Button, Popconfirm, Icon,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';

function RequestsList({ friendRequests, confirmAction }) {
  const { Panel } = Collapse;
  const ButtonGroup = Button.Group;

  if (!friendRequests.length) {
    return (
      <Empty
        description="No Friend Requests"
      />
    );
  }

  return (
    <Collapse bordered={false}>
      {
        friendRequests.map(requester => (
          <Panel
            header={(
              <span className="request-header">
                <img
                  className="image-30"
                  src={requester.avatarUrl}
                  alt={requester.name}
                />
                <span>{requester.name}</span>
              </span>
            )}
            key={requester.id}
          >
            <div className="request">
              <div className="requester-details">
                <img
                  className="image-150"
                  src={requester.avatarUrl}
                  alt={requester.name}
                />
                <p>{requester.name}</p>
                <p>{requester.email}</p>
              </div>
              <ButtonGroup className="request-actions">
                <Popconfirm
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  onConfirm={() => confirmAction({
                    requesterId: requester.id,
                    type: 'decline-request',
                  })}
                  title="Are you sure you want to decline this friend request?"
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="danger"
                  >
                    Decline
                  </Button>
                </Popconfirm>
                <Popconfirm
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  onConfirm={() => confirmAction({
                    requesterId: requester.id,
                    requesterName: requester.name,
                    type: 'accept-request',
                  })}
                  title="Are you sure you want to accept this friend request?"
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                  >
                    Accept
                  </Button>
                </Popconfirm>
              </ButtonGroup>
            </div>
          </Panel>
        ))
      }
    </Collapse>
  );
}

RequestsList.propTypes = {
  friendRequests: propTypes.instanceOf(Object).isRequired,
  confirmAction: propTypes.func.isRequired,
};

export default RequestsList;
