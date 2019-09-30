// third-party libraries
import React, { useState, FormEvent } from 'react'
import { Input, Button, message } from 'antd'

// custom imports
import { withFirebase } from 'src/firebase'
import { FirebaseCtx } from 'src/firebase/interfaces'
import './AppSidebar.less'

interface Props {
  firebase: FirebaseCtx
}

const AppSidebar: React.FC<Props> = ({ children, firebase }) => {
  const [inviteInput, setInviteInput] = useState('')
  const [isLoading, setLoading] = useState(false)

  const sendInvite = async (event: FormEvent) => {
    event.preventDefault()

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
          required
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
      {children}
    </aside>
  )
}

export default withFirebase(AppSidebar)
