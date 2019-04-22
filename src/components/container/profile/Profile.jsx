import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Tabs, Icon, Badge, Button, message, Popconfirm,
} from 'antd';
import { InvitesList, SentInvitesList } from 'components/presentational';
import { cancelFriendInvite, friendInviteAction } from 'actions/invites/invitesActions';
import { logoutAction } from 'actions/authentication/authActions';
import './Profile.less';

function Profile(props) {
  const {
    user, inviteAction, cancelInvite, logout,
  } = props;
  const { friendInvites, sentInvites, profile } = user;
  const { TabPane } = Tabs;
  const ButtonGroup = Button.Group;

  /* istanbul ignore next */
  const confirmAction = async (args) => {
    const {
      type, email, requesterName,
    } = args;

    switch (type) {
      case 'cancel-invite':
        await cancelInvite(email);
        message.success('Friend invite canceled successfully');
        break;

      case 'decline-invite':
        await inviteAction(email, 'decline');
        message.success('Friend invite declined successfully');
        break;

      case 'accept-invite':
        await inviteAction(email, 'accept');
        message.success(`You are now friends with ${requesterName}`);
        break;

      case 'logout':
        await logout();
        localStorage.clear();
        window.location.href = '/home';
        break;

      default:
        return false;
    }

    return true;
  };

  return (
    <div className="profile-container">
      <div className="user-details">
        <img
          className="user-image image-250"
          src={profile.avatarUrl}
          alt={profile.name}
        />
        <p className="user-name">{profile.name}</p>
        <p>{profile.email}</p>
        <ButtonGroup>
          <Popconfirm
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => confirmAction({
              type: 'logout',
            })}
            title="Are you sure you want to logout?"
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">
              Logout
            </Button>
          </Popconfirm>
          <Button>
            Edit Profile
          </Button>
        </ButtonGroup>
      </div>
      <div className="user-activity">
        <Tabs defaultActiveKey="invites">
          <TabPane
            tab={(
              <Badge
                count={friendInvites.length}
                style={{
                  backgroundColor: `${
                    friendInvites.length
                      ? '#f5222d' : '#1890ff'
                  }`,
                }}
                offset={[12, 0]}
              >
                <span className="inline-horizontal">
                  <Icon type="usergroup-add" />
                  Friend Invites
                </span>
              </Badge>
            )}
            key="invites"
          >
            <InvitesList
              friendInvites={friendInvites}
              confirmAction={confirmAction}
            />
          </TabPane>
          <TabPane
            tab={(
              <Badge
                count={sentInvites.length}
                style={{
                  backgroundColor: `${
                    sentInvites.length
                      ? '#f5222d' : '#1890ff'
                  }`,
                }}
                offset={[12, 0]}
              >
                <span className="inline-horizontal">
                  <Icon type="clock-circle" />
                  Pending Sent Invites
                </span>
              </Badge>
            )}
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
  );
}

Profile.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  inviteAction: propTypes.func.isRequired,
  cancelInvite: propTypes.func.isRequired,
  logout: propTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  inviteAction: (id, action) => dispatch(friendInviteAction(id, action)),
  cancelInvite: friendId => dispatch(cancelFriendInvite(friendId)),
  logout: () => dispatch(logoutAction()),
});

const ConnectedProfile = connect(null, mapDispatchToProps)(Profile);

export default ConnectedProfile;
