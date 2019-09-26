// third-party libraries
import React from 'react'
import { Collapse, Button, Popconfirm, Icon } from 'antd'

// custom imports
import Empty from '../Empty/Empty'
import { UserProfile } from 'src/redux/types'

interface Props {
  receivedInvites: UserProfile[]
  confirmAction: Function
}

const ReceivedInvitesList: React.FC<Props> = ({
  receivedInvites,
  confirmAction
}) => {
  const { Panel } = Collapse
  const ButtonGroup = Button.Group

  if (!receivedInvites.length) {
    return <Empty description="No New Invites" />
  }

  return (
    <Collapse bordered={false}>
      {receivedInvites.map(requester => (
        <Panel
          header={
            <span className="invite-header">
              <img
                className="image-30"
                src={requester.avatar}
                alt={requester.name}
              />
              <span style={{ marginLeft: '2%' }}>{requester.name}</span>
            </span>
          }
          key={requester.id}
        >
          <div className="invite">
            <div className="requester-details">
              <img
                className="image-150"
                src={requester.avatar}
                alt={requester.name}
              />
              <p>{requester.name}</p>
              <p>{requester.email}</p>
            </div>
            <ButtonGroup className="invite-actions">
              <Popconfirm
                icon={
                  <Icon type="question-circle-o" style={{ color: 'red' }} />
                }
                onConfirm={() =>
                  confirmAction({
                    email: requester.email,
                    type: 'decline-invite'
                  })
                }
                title="Are you sure you want to decline this friend invite?"
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Decline</Button>
              </Popconfirm>
              <Popconfirm
                icon={
                  <Icon type="question-circle-o" style={{ color: 'red' }} />
                }
                onConfirm={() =>
                  confirmAction({
                    email: requester.email,
                    requesterName: requester.name,
                    type: 'accept-invite'
                  })
                }
                title="Are you sure you want to accept this friend invite?"
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Accept</Button>
              </Popconfirm>
            </ButtonGroup>
          </div>
        </Panel>
      ))}
    </Collapse>
  )
}

export default ReceivedInvitesList
