import React from 'react';
import {
  Collapse, Button, Popconfirm, Icon,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';

function SentInvitesList({ sentInvites, confirmAction }) {
  const { Panel } = Collapse;

  if (!sentInvites.length) {
    return (
      <Empty
        description="No Pending Sent Invites"
      />
    );
  }

  return (
    <Collapse bordered={false}>
      {
        sentInvites.map(invite => (
          <Panel
            header={(
              <span className="invite-header">
                <img
                  className="image-30"
                  src={invite.avatarUrl}
                  alt={invite.name}
                />
                <span>{invite.name}</span>
              </span>
            )}
            key={invite.id}
          >
            <div className="invite">
              <div className="requester-details">
                <img
                  className="image-150"
                  src={invite.avatarUrl}
                  alt={invite.name}
                />
                <p>{invite.name}</p>
                <p>{invite.email}</p>
              </div>
              <Popconfirm
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                onConfirm={() => confirmAction({
                  email: invite.email,
                  type: 'cancel-invite',
                })}
                title="Are you sure you want to cancel this friend invite?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="danger"
                >
                  Cancel Friend Invite
                </Button>
              </Popconfirm>
            </div>
          </Panel>
        ))
      }
    </Collapse>
  );
}

SentInvitesList.propTypes = {
  sentInvites: propTypes.instanceOf(Object).isRequired,
  confirmAction: propTypes.func.isRequired,
};

export default SentInvitesList;
