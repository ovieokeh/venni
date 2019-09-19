import React, { useState, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Popconfirm, Icon, message, Input } from 'antd'
import {
  unfriendUserRequest,
  sendFriendInvite
} from 'src/redux/actions/invites/invitesActions'
import Empty from '../Empty/Empty'
import { UserProfile } from 'src/redux/types'
import './FriendsList.less'

interface Props {
  friends: UserProfile[]
  unfriend: Function
  invite: Function
}

export const FriendsList: React.FC<Props> = ({ friends, unfriend, invite }) => {
  const [inviteInput, setInviteInput] = useState('')
  const ButtonGroup = Button.Group

  const unfriendUser = async (email: string) => {
    try {
      const response = await unfriend(email)
      message.success(response.message)
    } catch (error) {
      message.error(error.message)
    }
  }

  const sendInvite = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await invite(inviteInput)
      message.success(response)

      setInviteInput('')
    } catch (error) {
      message.error(error.message)
    }
  }

  const renderContent = () => {
    if (!friends.length) return <Empty description="No Friends Yet" />

    return friends.map(friend => (
      <div key={friend.id} className="friend">
        <div className="friend__intro">
          <img
            className="friend__picture"
            src={friend.avatarUrl}
            alt={friend.name}
          />
          <div className="friend__details">
            <p className="friend__details__name">{friend.name}</p>
            <p className="friend__details__email">{friend.email}</p>
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
              <Button type="danger">
                <span className="inline-horizontal">
                  <Icon type="user-delete" />
                  Unfriend
                </span>
              </Button>
            </Popconfirm>
            <Button type="primary">
              <span className="inline-horizontal">
                <Icon type="message" />
                Chat
              </span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    ))
  }

  return (
    <div className="friends-list-container">
      <form className="invite-container" onSubmit={sendInvite}>
        <Input
          type="email"
          placeholder="invite a friend by email"
          value={inviteInput}
          onChange={event => setInviteInput(event.target.value)}
          size="large"
          allowClear
          required
        />
        <Button
          icon="plus"
          className="send-invite-btn"
          size="large"
          htmlType="submit"
        >
          Send Invite
        </Button>
      </form>
      {renderContent()}
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  invite: (email: string) => dispatch(sendFriendInvite(email)),
  unfriend: (friendId: string) => dispatch(unfriendUserRequest(friendId))
})

export default connect(
  null,
  mapDispatchToProps
)(FriendsList)
