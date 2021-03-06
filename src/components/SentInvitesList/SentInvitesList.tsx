import React from 'react'
import { Collapse, Button, Popconfirm, Icon } from 'antd'
import Empty from '../Empty/Empty'
import { UserProfile } from 'src/redux/types'

interface Props {
  sentInvites: UserProfile[]
  confirmAction: Function
}

const SentInvitesList: React.FC<Props> = ({ sentInvites, confirmAction }) => {
  const { Panel } = Collapse

  if (!sentInvites.length)
    return <Empty description="No Pending Sent Invites" />

  return (
    <Collapse bordered={false}>
      {sentInvites.map(invite => (
        <Panel
          header={
            <span className="invite-header">
              <img className="image-30" src={invite.avatar} alt={invite.name} />
              <span style={{ marginLeft: '2%' }}>{invite.name}</span>
            </span>
          }
          key={invite.id}
        >
          <div className="invite">
            <div className="requester-details">
              <img
                className="image-150"
                src={invite.avatar}
                alt={invite.name}
              />
              <p>{invite.name}</p>
              <p>{invite.email}</p>
            </div>
            <Popconfirm
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() =>
                confirmAction({
                  id: invite.id,
                  type: 'cancel-invite'
                })
              }
              title="Are you sure you want to cancel this friend invite?"
              okText="Yes"
              cancelText="No"
            >
              <Button className="ghost-btn-danger" type="danger" ghost>
                Cancel Friend Invite
              </Button>
            </Popconfirm>
          </div>
        </Panel>
      ))}
    </Collapse>
  )
}

export default SentInvitesList
