// third-party libraries
import React, { useState } from 'react'
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

interface Props {
  user: UserProfile
  social: SocialState
  messages: MessageState
  isSidebarCollapsed: boolean
  firebase: FirebaseCtx
}

export const App: React.FC<Props> = props => {
  window.document.title = 'Venni'
  const { social, user, messages, firebase } = props
  const { friends } = social

  const [selectedFriend, selectFriend] = useState<null | UserProfile>(null)
  useSubscriptions(firebase)

  const onFriendClick = (event: any) => {
    const activeFriend = friends.find(f => f.id === event.target.id)
    selectFriend(activeFriend as UserProfile)
  }

  return (
    <div className="app" data-aos="zoom-up">
      <AppSidebar
        friends={friends}
        selectedFriend={selectedFriend}
        onFriendClick={onFriendClick}
      />
      <AppMain user={user} friend={selectedFriend} messages={messages} />
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.profile,
  social: state.social,
  messages: state.messages
})

export default connect(mapStateToProps)(withFirebase(App))
