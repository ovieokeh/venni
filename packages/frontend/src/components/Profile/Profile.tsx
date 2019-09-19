import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Icon, Badge, Button, Popconfirm, message } from 'antd'
import { logout as logoutAction } from 'src/redux/actions/authentication/authActions'
import {
  cancelFriendInvite,
  friendInviteAction
} from 'src/redux/actions/invites/invitesActions'
import { UserProfile, ReduxState, SocialState } from 'src/redux/types'
import ReceivedInvitesList from '../ReceivedInvitesList/ReceivedInvitesList'
import SentInvitesList from '../SentInvitesList/SentInvitesList'
import './Profile.less'

interface Props {
  user: UserProfile
  social: SocialState
  logout: () => void
  inviteAction: Function
  cancelInvite: Function
}

interface ConfirmActionProps {
  type: string
  email: string
  requesterName: string
}

export const Profile: React.FC<Props> = (props: Props) => {
  const { user, social } = props
  const { receivedInvites, sentInvites } = social
  const { TabPane } = Tabs
  const ButtonGroup = Button.Group

  const confirmAction = async (args: ConfirmActionProps) => {
    const { type, email, requesterName } = args

    switch (type) {
      case 'cancel-invite':
        await props.cancelInvite(email)
        message.success('Friend invite canceled successfully')
        break

      case 'decline-invite':
        await props.inviteAction(email, 'decline')
        message.success('Friend invite declined successfully')
        break

      case 'accept-invite':
        await props.inviteAction(email, 'accept')
        message.success(`You are now friends with ${requesterName}`)
        break

      default:
        return false
    }

    return true
  }

  return (
    <div className="profile">
      <div className="profile__user-details">
        <img
          className="profile__user-details__image image-250"
          src={user.avatarUrl}
          alt={user.name}
        />
        <p className="profile__user-details__name">{user.name}</p>
        <p>{user.email}</p>
        <ButtonGroup>
          <Popconfirm
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={props.logout}
            title="Are you sure you want to logout?"
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Logout</Button>
          </Popconfirm>
          <Button>Edit Profile</Button>
        </ButtonGroup>
      </div>
      <div className="profile__user-activity">
        <Tabs defaultActiveKey="invites">
          <TabPane
            tab={
              <Badge
                count={receivedInvites.length}
                style={{
                  backgroundColor: `${
                    receivedInvites.length ? '#f5222d' : '#1890ff'
                  }`
                }}
                offset={[12, 0]}
              >
                <span className="inline-horizontal">
                  <Icon type="usergroup-add" />
                  Friend Invites
                </span>
              </Badge>
            }
            key="invites"
          >
            <ReceivedInvitesList
              receivedInvites={receivedInvites}
              confirmAction={confirmAction}
            />
          </TabPane>
          <TabPane
            tab={
              <Badge
                count={sentInvites.length}
                style={{
                  backgroundColor: `${
                    sentInvites.length ? '#f5222d' : '#1890ff'
                  }`
                }}
                offset={[12, 0]}
              >
                <span className="inline-horizontal">
                  <Icon type="clock-circle" />
                  Pending Sent Invites
                </span>
              </Badge>
            }
            key="sent-invites"
          >
            <SentInvitesList
              sentInvites={sentInvites}
              confirmAction={confirmAction}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: any) => ({
  inviteAction: (id: string, action: string) =>
    dispatch(friendInviteAction(id, action)),
  cancelInvite: (friendId: string) => dispatch(cancelFriendInvite(friendId)),
  logout: () => dispatch(logoutAction())
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.profile,
  social: state.social
})

const ConnectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ConnectedProfile
