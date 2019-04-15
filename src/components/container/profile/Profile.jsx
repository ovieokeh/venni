import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Tabs, Icon, Badge, Button, message, Popconfirm,
} from 'antd';
import { FriendsList, RequestsList, SentRequestsList } from 'components/presentational';
import {
  unfriendUserRequest, cancelFriendRequest, friendRequestAction,
} from 'actions/requests/requestsActions';
import { logoutAction } from 'actions/authentication/authActions';
import './Profile.less';

function Profile(props) {
  const {
    user, requestAction, unfriend,
    cancelRequest, logout,
  } = props;
  const { friendRequests, sentRequests, friends } = user;
  const { TabPane } = Tabs;
  const ButtonGroup = Button.Group;

  /* istanbul ignore next */
  const confirmAction = async (args) => {
    const {
      friendId, friendName, type,
      requestId, requesterId, requesterName,
    } = args;

    switch (type) {
      case 'confirm-unfriend':
        await unfriend(friendId);
        message.success(`You are no longer friends with ${friendName}`);
        break;

      case 'cancel-request':
        await cancelRequest(requestId);
        message.success('Friend request canceled successfully');
        break;

      case 'decline-request':
        await requestAction(requesterId, 'decline');
        message.success('Friend request declined successfully');
        break;

      case 'accept-request':
        await requestAction(requesterId, 'accept');
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
          src={user.avatarUrl}
          alt={user.name}
        />
        <p className="user-name">{user.name}</p>
        <p>{user.email}</p>
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
        <Tabs defaultActiveKey="friends">
          <TabPane
            tab={(
              <Badge
                count={friends.length}
                style={{ backgroundColor: '#1890ff' }}
                offset={[12, 0]}
              >
                <span className="inline-horizontal">
                  <Icon type="team" />
                  Friends
                </span>
              </Badge>
            )}
            key="friends"
          >
            <FriendsList
              friends={friends}
              confirmAction={confirmAction}
            />
          </TabPane>
          <TabPane
            tab={(
              <Badge
                count={friendRequests.length}
                style={{
                  backgroundColor: `${
                    friendRequests.length
                      ? '#f5222d' : '#1890ff'
                  }`,
                }}
                offset={[12, 0]}
              >
                <span className="inline-horizontal">
                  <Icon type="usergroup-add" />
                  Friend Requests
                </span>
              </Badge>
            )}
            key="requests"
          >
            <RequestsList
              friendRequests={friendRequests}
              confirmAction={confirmAction}
            />
          </TabPane>
          <TabPane
            tab={(
              <Badge
                count={sentRequests.length}
                style={{
                  backgroundColor: `${
                    sentRequests.length
                      ? '#f5222d' : '#1890ff'
                  }`,
                }}
                offset={[12, 0]}
              >
                <span className="inline-horizontal">
                  <Icon type="clock-circle" />
                  Pending Sent Requests
                </span>
              </Badge>
            )}
            key="sent-requests"
          >
            <SentRequestsList
              sentRequests={sentRequests}
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
  requestAction: propTypes.func.isRequired,
  unfriend: propTypes.func.isRequired,
  cancelRequest: propTypes.func.isRequired,
  logout: propTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  requestAction: (id, action) => dispatch(friendRequestAction(id, action)),
  unfriend: friendId => dispatch(unfriendUserRequest(friendId)),
  cancelRequest: friendId => dispatch(cancelFriendRequest(friendId)),
  logout: () => dispatch(logoutAction()),
});

const ConnectedProfile = connect(null, mapDispatchToProps)(Profile);

export default ConnectedProfile;
