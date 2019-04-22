import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Layout, Menu, Icon,
} from 'antd';
import { FriendsList, AllUsers } from 'components/presentational';
import { getProfileRequest } from 'actions/profile/profileActions';
import { getUsersRequest } from 'actions/users/usersActions';
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

    const { loadProfile, getAllUsers } = this.props;

    await loadProfile();
    await getAllUsers();
  }

  handleMenuItemClick = event => this.setState({ currentlySelected: event.key });

  renderContent = () => {
    const { currentlySelected } = this.state;
    const { user: { friends }, allUsers } = this.props;

    switch (currentlySelected) {
      case 'strangers':
        return <AllUsers users={allUsers} />;
      default:
        return <FriendsList friends={friends} />;
    }
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
            height: '100vh',
          }}
          className="sidebar"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['friends']}
            defaultOpenKeys={['groups', 'dms']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
          >
            <SubMenu
              key="groups"
              title={(
                <span className="group-title">
                  <Icon type="team" />
                  <span>Groups</span>
                </span>
              )}
            >
              <Menu.Item
                key="friends"
                className="friends"
                onClick={event => this.handleMenuItemClick(event)}
              >
                Your Friends
              </Menu.Item>
              <Menu.Item
                key="strangers"
                className="strangers"
                onClick={event => this.handleMenuItemClick(event)}
              >
                Strangers
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="dms"
              title={(
                <span className="group-title">
                  <Icon type="message" />
                  <span>Direct Messages</span>
                </span>
              )}
            >
              <Menu.Item key="seyi">Oluseyi Anani</Menu.Item>
              <Menu.Item key="tessy">Tessy</Menu.Item>
              <Menu.Item key="iwar">Tay Iwar</Menu.Item>
              <Menu.Item key="sza">Solana</Menu.Item>
              <Menu.Item key="fred">Fred</Menu.Item>
              <Menu.Item key="ajiri">Ajiri Edafe</Menu.Item>
              <Menu.Item key="chidera">Chidera</Menu.Item>
              <Menu.Item key="ib">Ibrahim</Menu.Item>
              <Menu.Item key="tersoo">Tersoo Atsen</Menu.Item>
              <Menu.Item key="jigsaw">Victor</Menu.Item>
              <Menu.Item key="fire">Fire Ship</Menu.Item>
              <Menu.Item key="asami">Asami</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content
          style={{
            overflow: 'scroll',
            padding: '1em',
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
  allUsers: propTypes.instanceOf(Object).isRequired,
  loadProfile: propTypes.func.isRequired,
  getAllUsers: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.profile,
  allUsers: state.allUsers.users,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(getProfileRequest()),
  getAllUsers: () => dispatch(getUsersRequest()),
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
