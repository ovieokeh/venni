// third-party libraries
import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, Icon, message } from 'antd'

// custom imports
import { withFirebase } from 'src/firebase'
import { FirebaseCtx } from 'src/firebase/interfaces'
import Empty from '../Empty/Empty'
import { UserProfile } from 'src/redux/types'
import './FriendsList.less'
import { useWindowWidth } from 'src/utilities'

interface Props {
  friends: UserProfile[]
  firebase: FirebaseCtx
}

export const FriendsList: React.FC<Props> = ({ friends, firebase }) => {
  const [isMobile, setIsMobile] = useState(false)
  const windowWidth = useWindowWidth()
  const ButtonGroup = Button.Group

  useEffect(() => {
    windowWidth < 768 ? setIsMobile(true) : setIsMobile(false)
  }, [windowWidth])

  const unfriendUser = async (friend: UserProfile) => {
    try {
      await firebase.unfriend(friend.id)
      message.success(friend.name + ' is no longer your friend')
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
            className="friend__picture image-50"
            src={friend.avatar}
            alt={friend.name}
          />
          <div className="friend__details">
            <p className="friend__details__name">{friend.name}</p>
            <p className="friend__details__email">{friend.email}</p>
          </div>
        </div>
        <ButtonGroup className="friend__actions">
          <Popconfirm
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => unfriendUser(friend)}
            title={`Are you sure you want to unfriend ${friend.name}?`}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">
              <span className="inline-horizontal">
                <Icon type="user-delete" />
                {!isMobile && 'Unfriend'}
              </span>
            </Button>
          </Popconfirm>
          <Button type="primary">
            <span className="inline-horizontal">
              <Icon type="message" />
              {!isMobile && 'Chat'}
            </span>
          </Button>
        </ButtonGroup>
      </div>
    ))
  }

  return <div className="friends-list-container">{renderContent()}</div>
}

export default withFirebase(FriendsList)
