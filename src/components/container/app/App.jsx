import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Layout, Menu, Icon,
} from 'antd';
import { FriendsList } from 'components/presentational';
import { getProfileRequest } from 'actions/profile/profileActions';
import './App.less';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentlySelected: 'friends',
    };
  }

  async componentDidMount() {
    window.document.title = 'Venni';

    const { loadProfile } = this.props;

    await loadProfile();
  }

  handleMenuItemClick = event => this.setState({ currentlySelected: event.key });

  renderContent = () => {
    const { currentlySelected } = this.state;
    const { user: { friends } } = this.props;

    switch (currentlySelected) {
      default:
        return <FriendsList friends={friends} />;
    }
  }

  renderFriends = () => {
    const { user: { friends } } = this.props;

    return friends.map(friend => (
      <Menu.Item key={friend.id}>
        <img
          alt={friend.name}
          src={friend.avatarUrl}
          className="menu-item-avatar"
        />
        <span className="menu-item-text">
          {friend.name}
        </span>
      </Menu.Item>
    ));
  }

  render() {
    const { Content, Sider } = Layout;
    const { SubMenu } = Menu;

    return (
      <Layout className="app-container" hasSider>
        <Sider
          width={300}
          style={{
            background: '#001529',
            height: '94vh',
          }}
          className="sidebar"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['friends']}
            defaultOpenKeys={['dms']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
          >
            <Menu.Item
              key="friends"
              className="friends-menu-item"
              onClick={event => this.handleMenuItemClick(event)}
            >
              <div>
                <Icon type="team" />
                {' '}
                Your Friends
              </div>
            </Menu.Item>
            <SubMenu
              key="dms"
              title={(
                <span className="group-title">
                  <Icon type="message" />
                  <span>Direct Messages</span>
                </span>
              )}
            >
              {this.renderFriends()}
            </SubMenu>
          </Menu>
        </Sider>
        <Content
          style={{
            overflow: 'scroll',
            padding: '1em',
            height: '94vh',
          }}
        >
          <div className="content">
            {this.renderContent()}
          </div>
        </Content>
      </Layout>
    );
  }
}

App.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  loadProfile: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(getProfileRequest()),
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
