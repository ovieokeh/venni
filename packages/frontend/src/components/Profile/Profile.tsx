import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Icon, Badge, Button, Popconfirm } from 'antd'
import { logout as logoutAction } from 'src/redux/actions/authentication/authActions'
import { ProfileState, ReduxState } from 'src/redux/types'
import './Profile.less'
import { Dispatch } from 'redux'

interface Props {
  user: ProfileState
  logout: () => void
}

const Profile: React.FC<Props> = (props: Props) => {
  const { user } = props
  const { friendInvites, sentInvites } = user
  const { TabPane } = Tabs
  const ButtonGroup = Button.Group

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
                count={friendInvites.length}
                style={{
                  backgroundColor: `${
                    friendInvites.length ? '#f5222d' : '#1890ff'
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
            {/* <InvitesList
              friendInvites={friendInvites}
              confirmAction={confirmAction}
            /> */}
            TODO
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
            {/* <SentInvitesList
              sentInvites={sentInvites}
              confirmAction={confirmAction}
            /> */}
            TODO
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutAction())
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.profile
})

const ConnectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ConnectedProfile
