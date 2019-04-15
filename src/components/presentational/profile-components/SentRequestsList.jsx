import React from 'react';
import {
  Collapse, Button, Popconfirm, Icon,
} from 'antd';
import propTypes from 'prop-types';
import { Empty } from 'components/common';

function SentRequestsList({ sentRequests, confirmAction }) {
  const { Panel } = Collapse;

  if (!sentRequests.length) {
    return (
      <Empty
        description="No Pending Sent Requests"
      />
    );
  }

  return (
    <Collapse bordered={false}>
      {
        sentRequests.map(request => (
          <Panel
            header={(
              <span className="request-header">
                <img
                  className="image-30"
                  src={request.avatarUrl}
                  alt={request.name}
                />
                <span>{request.name}</span>
              </span>
            )}
            key={request.id}
          >
            <div className="request">
              <div className="requester-details">
                <img
                  className="image-150"
                  src={request.avatarUrl}
                  alt={request.name}
                />
                <p>{request.name}</p>
                <p>{request.email}</p>
              </div>
              <Popconfirm
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                onConfirm={() => confirmAction({
                  requestId: request.id,
                  type: 'cancel-request',
                })}
                title="Are you sure you want to cancel this friend request?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="danger"
                >
                  Cancel Friend Request
                </Button>
              </Popconfirm>
            </div>
          </Panel>
        ))
      }
    </Collapse>
  );
}

SentRequestsList.propTypes = {
  sentRequests: propTypes.instanceOf(Object).isRequired,
  confirmAction: propTypes.func.isRequired,
};

export default SentRequestsList;
