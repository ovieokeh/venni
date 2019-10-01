// third-party libraries
import React, { useState, useRef } from 'react'
import { Icon, Button } from 'antd'
import TextareaAutosize from 'react-textarea-autosize'
import moment from 'moment'

// custom imports
import { FirebaseCtx } from 'src/firebase/interfaces'
import { withFirebase } from 'src/firebase'
import { UserProfile, MessageState } from 'src/redux/types'
import store from 'src/redux/store'
import * as socialActions from 'src/redux/actions/social/socialActions'
import './AppMain.less'

interface Props {
  friend: UserProfile
  user: UserProfile
  messages: MessageState
  firebase: FirebaseCtx
}

export const AppMain: React.FC<Props> = props => {
  const [messageInput, setMessage] = useState('')
  const chatArea = useRef<HTMLTextAreaElement>(null)

  const { firebase, friend, user, messages } = props

  const sendMessage = () => {
    if (!messageInput.trim().length) return

    setMessage('')
    firebase.sendMessage(friend.id, messageInput)

    if (!chatArea.current) return
    chatArea.current.scrollTop = chatArea.current.scrollHeight
  }

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value[event.target.value.length - 1] === '\n') return
    setMessage(event.target.value)
  }

  const handleMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage()
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      sendMessage()
      setMessage('')
    }
  }

  const prepareMessages = () => {
    const joinedMessages = [
      ...messages.sentMessages,
      ...messages.receivedMessages
    ]
      .filter(m => m.receiver === friend.id || m.sender === friend.id)
      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))

    return joinedMessages
  }

  const renderMessages = () => {
    if (!friend) return

    const messages = prepareMessages()

    return messages.map(m => {
      const time = moment(new Date(m.timestamp))
      const className = `app__main__chat-area__message
      ${
        m.sender === user.id
          ? 'app__main__chat-area__message-sent'
          : `app__main__chat-area__message-received ${
              m.isRead === false ? 'unread' : ''
            }`
      }`

      if (!m.isRead) {
        setTimeout(() => {
          firebase
            .markMessageAsRead(m.timestamp)
            .then(() =>
              store.dispatch(socialActions.readNotification(m.sender))
            )
        }, 500)
      }

      return (
        <p key={m.timestamp} className={className}>
          {m.message}
          <span>{moment(time).fromNow()}</span>
          {m.sender === user.id && (
            <span className="read-indicator">{m.isRead ? '✓✓' : '✓'}</span>
          )}
        </p>
      )
    })
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
      <section ref={chatArea} className="app__main__chat-area">
        {renderMessages()}
      </section>
      <form className="app__main__message-box" onSubmit={handleMessage}>
        <TextareaAutosize
          className="app__main__message-box__input"
          placeholder="Type a message here"
          value={messageInput}
          onKeyPress={onKeyUp}
          onChange={onInputChange}
          maxRows={3}
        />
        <Button
          className="app__main__message-box__btn"
          type="default"
          icon="message"
          size="large"
          htmlType="submit"
          loading={false}
        />
      </form>
    </main>
  )
}

export default withFirebase(AppMain)
