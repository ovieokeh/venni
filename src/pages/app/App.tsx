// third-party libraries
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'antd'
import TextareaAutosize from 'react-textarea-autosize'
import moment from 'moment'

// custom imports
import { FirebaseCtx } from 'src/firebase/interfaces'
import { withFirebase } from 'src/firebase'
import { AppSidebar } from 'src/components'
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

const classN = (def: string, opt: string, condition: boolean) => {
  let className = def
  if (condition) {
    className += ' ' + opt
  }

  return className
}

export const App: React.FC<Props> = props => {
  window.document.title = 'Venni'

  const [messageInput, setMessage] = useState('')
  const [selectedFriend, selectFriend] = useState<null | UserProfile>(null)
  useSubscriptions(props.firebase)

  const { friends } = props.social

  const handleMenuItemClick = (event: any) => {
    const activeFriend = friends.find(f => f.id === event.target.id)
    selectFriend(activeFriend as UserProfile)
  }

  const handleMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!messageInput.trim().length) return

    setMessage('')
    props.firebase.sendMessage((selectedFriend as UserProfile).id, messageInput)
  }

  const prepareMessages = () => {
    const { messages } = props

    const friend = selectedFriend as UserProfile

    const joinedMessages = [
      ...messages.sentMessages,
      ...messages.receivedMessages
    ]
      .filter(m => m.receiver === friend.id || m.sender === friend.id)
      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))

    return joinedMessages
  }

  const renderMessages = () => {
    const { user } = props

    if (!selectedFriend) return

    const messages = prepareMessages()

    return messages.map(m => {
      const time = moment(new Date(m.timestamp))
      const className = `app__main__chat-area__message
      ${
        m.sender === user.id
          ? 'app__main__chat-area__message-sent'
          : 'app__main__chat-area__message-received'
      }`

      return (
        <p key={m.timestamp} className={className}>
          {m.message}
          <span>{moment(time).fromNow()}</span>
        </p>
      )
    })
  }

  const renderMain = () => {
    if (!selectedFriend) {
      return (
        <main className="app__main empty">
          <Icon className="app__main--msg-icon" type="message" />
          <h2 className="app__main--msg">
            Select a friend to start chatting...
          </h2>
        </main>
      )
    }

    return (
      <main className="app__main">
        <header className="app__main__header">
          <img
            className="image-30"
            src={selectedFriend.avatar}
            alt={selectedFriend.name}
          />
          <p className="app__main__header--p">{selectedFriend.name}</p>
        </header>
        <section className="app__main__chat-area">{renderMessages()}</section>
        <form className="app__main__message-box" onSubmit={handleMessage}>
          <TextareaAutosize
            className="app__main__message-box__input"
            placeholder="Type a message here"
            value={messageInput}
            onChange={(e: any) => setMessage(e.target.value)}
            maxRows={3}
          />
          <Button
            className="app__main__message-box__btn"
            type="primary"
            icon="message"
            size="large"
            htmlType="submit"
            loading={false}
          />
        </form>
      </main>
    )
  }

  const renderFriends = () => {
    const {
      social: { friends }
    } = props

    return friends.map(friend => {
      const isSelected = selectedFriend && selectedFriend.id === friend.id

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
          <img
            alt={friend.name}
            src={friend.avatar}
            className="app__sidebar__item-avatar image-40"
          />
          <span className="app__sidebar__item-text">{friend.name}</span>
        </div>
      )
    })
  }

  return (
    <div className="app" data-aos="zoom-up">
      <AppSidebar>{renderFriends()}</AppSidebar>

      {renderMain()}
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.profile,
  social: state.social,
  messages: state.messages
})

export default connect(mapStateToProps)(withFirebase(App))
