// third-party libraries
import React, { useState } from 'react'
import { Button } from 'antd'
import TextArea from 'react-textarea-autosize'

// custom imports
import { FirebaseCtx } from 'src/firebase/interfaces'
import { withFirebase } from 'src/firebase'
import { UserProfile } from 'src/redux/types'
import './ChatInput.less'

interface Props {
  friend: UserProfile
  firebase: FirebaseCtx
}

export const ChatInput: React.FC<Props> = props => {
  const [messageInput, setMessage] = useState('')
  const { firebase, friend } = props

  const sendMessage = () => {
    if (!messageInput.trim().length) return

    setMessage('')
    firebase.sendMessage(friend.id, messageInput)
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

  return (
    <form className="app__main__message-box" onSubmit={handleMessage}>
      <TextArea
        className="app__main__message-box__input"
        placeholder="Type a message here"
        value={messageInput}
        onKeyPress={onKeyUp}
        onChange={onInputChange}
        maxRows={3}
        autoFocus
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
  )
}

export default withFirebase(ChatInput)
