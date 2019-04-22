import React from 'react';
import {
  Collapse, Button, Popconfirm, Icon,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';

function InvitesList({ friendInvites, confirmAction }) {
  const { Panel } = Collapse;
  const ButtonGroup = Button.Group;

  if (!friendInvites.length) {
    return (
      <Empty
        description="No Friend Invites"
      />
    );
  }

  return (
    <Collapse bordered={false}>
      {
        friendInvites.map(requester => (
          <Panel
            header={(
              <span className="invite-header">
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
            <div className="invite">
              <div className="requester-details">
                <img
                  className="image-150"
                  src={requester.avatarUrl}
                  alt={requester.name}
                />
                <p>{requester.name}</p>
                <p>{requester.email}</p>
              </div>
              <ButtonGroup className="invite-actions">
                <Popconfirm
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  onConfirm={() => confirmAction({
                    email: requester.email,
                    type: 'decline-invite',
                  })}
                  title="Are you sure you want to decline this friend invite?"
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
                    email: requester.email,
                    requesterName: requester.name,
                    type: 'accept-invite',
                  })}
                  title="Are you sure you want to accept this friend invite?"
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

InvitesList.propTypes = {
  friendInvites: propTypes.instanceOf(Object).isRequired,
  confirmAction: propTypes.func.isRequired,
};

export default InvitesList;
