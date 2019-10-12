import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Icon, Badge, message } from 'antd'
import { UserProfile, ReduxState, SocialState } from 'src/redux/types'
import ReceivedInvitesList from '../ReceivedInvitesList/ReceivedInvitesList'
import SentInvitesList from '../SentInvitesList/SentInvitesList'
import './Profile.less'
import { FirebaseCtx } from 'src/firebase/interfaces'
import { withFirebase } from 'src/firebase'
import ConnectedProfileDetails from '../ProfileDetails/ProfileDetails'

interface Props {
  user: UserProfile
  social: SocialState
  firebase: FirebaseCtx
}

interface ConfirmActionProps {
  id?: string
  type: string
  email: string
  requesterName: string
}

export const Profile: React.FC<Props> = (props: Props) => {
  const { user, social } = props
  const { receivedInvites, sentInvites } = social
  const { TabPane } = Tabs

  const confirmAction = async (args: ConfirmActionProps) => {
    const { firebase } = props
    const { id, type, email, requesterName } = args

    switch (type) {
      case 'cancel-invite':
        await firebase.cancelSentInvite(id as string)
        message.success('Invite canceled successfully')
        break

      case 'decline-invite':
        await firebase.respondToReceivedInvite('decline', email)
        message.success('Invite declined successfully')
        break

      case 'accept-invite':
        await firebase.respondToReceivedInvite('accept', email)
        message.success(`You are now friends with ${requesterName}`)
        break

      default:
        return false
    }

    return true
  }

  return (
    <div className="profile">
      <ConnectedProfileDetails user={user} />
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

const mapStateToProps = (state: ReduxState) => ({
  user: state.profile,
  social: state.social
})

const ConnectedProfile = connect(mapStateToProps)(withFirebase(Profile))

export default ConnectedProfile
