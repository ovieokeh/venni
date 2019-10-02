// third-party libraries
import React, { useState } from 'react'
import { Icon } from 'antd'

// custom imports
import { UserProfile, MessageState } from 'src/redux/types'
import { ChatArea, ChatInput } from '..'
import './AppMain.less'

interface Props {
  friend: null | UserProfile
  user: UserProfile
  messages: MessageState
}

export const AppMain: React.FC<Props> = props => {
  const [shouldScrollDown, setShouldScrollDown] = useState(false)
  const { friend, user, messages } = props

  const onSendMessage = () => {
    setShouldScrollDown(true)
    setShouldScrollDown(false)
  }

  if (!friend) {
    return (
      <main className="app__main empty">
        <Icon className="app__main--msg-icon" type="message" />
        <h2 className="app__main--msg">Select a friend to start chatting...</h2>
      </main>
    )
  }

  return (
    <main className="app__main">
      <header className="app__main__header">
        <img className="image-30" src={friend.avatar} alt={friend.name} />
        <p className="app__main__header--p">{friend.name}</p>
      </header>
      <ChatArea
        friend={friend}
        user={user}
        messages={messages}
        shouldScrollDown={shouldScrollDown}
      />
      <ChatInput friend={friend} onSendMessage={onSendMessage} />
    </main>
  )
}

export default AppMain
