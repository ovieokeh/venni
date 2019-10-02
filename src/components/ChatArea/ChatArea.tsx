// third-party libraries
import React, { useRef, useEffect } from 'react'
import moment from 'moment'

// custom imports
import { FirebaseCtx } from 'src/firebase/interfaces'
import { withFirebase } from 'src/firebase'
import { UserProfile, MessageState } from 'src/redux/types'
import store from 'src/redux/store'
import * as socialActions from 'src/redux/actions/social/socialActions'
import './ChatArea.less'

interface Props {
  friend: UserProfile
  user: UserProfile
  messages: MessageState
  firebase: FirebaseCtx
}

export const ChatArea: React.FC<Props> = props => {
  const ref = useRef<HTMLDivElement>(null)
  const { firebase, friend, user, messages } = props

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [messages, friend])

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

  return (
    <section ref={ref} className="app__main__chat-area">
      {renderMessages()}
    </section>
  )
}

export default withFirebase(ChatArea)
