import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Empty } from 'components/common';
import { getProfileRequest } from 'actions/profile/profileActions';
import './App.less';

function App(props) {
  window.document.title = 'Venni';

  const { loadProfile, user } = props;
  const { Content, Sider } = Layout;
  const { SubMenu } = Menu;

  useEffect(() => {
    loadProfile();
  }, []);

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
          defaultSelectedKeys={['general']}
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
            <Menu.Item key="general">General</Menu.Item>
            <Menu.Item key="coding-geniuses">Coding Geniuses</Menu.Item>
            <Menu.Item key="tall">Tall Boys</Menu.Item>
            <Menu.Item key="mib">Men in Black</Menu.Item>
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
        <Empty description={`Welcome ${user.name}`} />
      </Content>
    </Layout>
  );
}

App.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  loadProfile: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(getProfileRequest()),
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
