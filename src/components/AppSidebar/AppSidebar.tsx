// third-party libraries
import React, { useState, useEffect, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Badge, Input, Button, message } from 'antd'

// custom imports
import { withFirebase } from 'src/firebase'
import { FirebaseCtx } from 'src/firebase/interfaces'
import { UserProfile, ReduxState } from 'src/redux/types'
import './AppSidebar.less'

interface Props {
  firebase: FirebaseCtx
  friends: UserProfile[]
  selectedFriend: UserProfile
  notifications: { [x: string]: boolean }
  onFriendClick: (event: any) => void
}

const AppSidebar: React.FC<Props> = props => {
  const { friends, selectedFriend, firebase, onFriendClick } = props

  const [notifications, setNotifications] = useState<any>({})
  const [inviteInput, setInviteInput] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setNotifications(props.notifications)
  }, [props.notifications])

  const renderFriends = () => {
    return friends.map(friend => {
      const isSelected = selectedFriend && selectedFriend.id === friend.id
      const hasPendingNotification = !!notifications[friend.id]
      const className = `app__sidebar__item ${
        isSelected ? 'app__sidebar__item--active' : ''
      }`

      return (
        <div
          key={friend.id}
          className={className}
          id={friend.id}
          onClick={onFriendClick}
        >
          <Badge dot={hasPendingNotification} offset={['-15', '0']}>
            <img
              alt={friend.name}
              src={friend.avatar}
              className="app__sidebar__item-avatar image-40"
            />
          </Badge>
          <span className="app__sidebar__item-text">{friend.name}</span>
        </div>
      )
    })
  }

  const sendInvite = async (event: FormEvent) => {
    event.preventDefault()
    if (!inviteInput.trim().length) return

    try {
      setLoading(true)
      await firebase.sendFriendInvite(inviteInput)
      message.success('Friend invite sent successfully')

      setInviteInput('')
    } catch (error) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderInviteForm = () => {
    return (
      <form className="app__sidebar__invite-container" onSubmit={sendInvite}>
        <Input
          className="invite-input"
          type="email"
          placeholder="Invite a friend by email"
          value={inviteInput}
          onChange={event => setInviteInput(event.target.value)}
          size="large"
          allowClear
        />
        <Button
          icon="plus"
          className="send-invite-btn"
          size="large"
          htmlType="submit"
          loading={isLoading}
        />
      </form>
    )
  }

  return (
    <aside className="app__sidebar">
      {renderInviteForm()}
      {renderFriends()}
    </aside>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  notifications: state.notifications.notifications
})

export default connect(mapStateToProps)(withFirebase(AppSidebar))
