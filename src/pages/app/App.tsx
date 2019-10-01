// third-party libraries
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// custom imports
import { FirebaseCtx } from 'src/firebase/interfaces'
import { withFirebase } from 'src/firebase'
import { AppSidebar, AppMain } from 'src/components'
import {
  UserProfile,
  SocialState,
  ReduxState,
  MessageState
} from 'src/redux/types'
import { useSubscriptions } from './subscriptions'
import './App.less'
import { Badge } from 'antd'

interface Props {
  user: UserProfile
  social: SocialState
  messages: MessageState
  isSidebarCollapsed: boolean
  firebase: FirebaseCtx
  notifications: { [x: string]: boolean }
}

const classN = (def: string, opt: string, condition: boolean) => {
  let className = def
  if (condition) {
    className += ' ' + opt
  }

  return className
}

export const App: React.FC<Props> = props => {
  window.document.title = 'Venni'

  const [selectedFriend, selectFriend] = useState<null | UserProfile>(null)
  const [notifications, setNotifications] = useState<any>({})
  useSubscriptions(props.firebase)

  useEffect(() => {
    setNotifications(props.notifications)
  }, [props.notifications])

  const {
    social: { friends },
    user,
    messages
  } = props

  const handleMenuItemClick = (event: any) => {
    const activeFriend = friends.find(f => f.id === event.target.id)
    selectFriend(activeFriend as UserProfile)
  }

  const renderFriends = () => {
    return friends.map(friend => {
      const isSelected = selectedFriend && selectedFriend.id === friend.id
      const hasPendingNotification = !!notifications[friend.id]

      return (
        <div
          key={friend.id}
          className={classN(
            'app__sidebar__item',
            'app__sidebar__item--active',
            !!isSelected
          )}
          id={friend.id}
          onClick={handleMenuItemClick}
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

  return (
    <div className="app" data-aos="zoom-up">
      <AppSidebar>{renderFriends()}</AppSidebar>
      <AppMain user={user} friend={selectedFriend} messages={messages} />
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.profile,
  social: state.social,
  messages: state.messages,
  notifications: state.notifications.notifications
})

export default connect(mapStateToProps)(withFirebase(App))
