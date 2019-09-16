import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { FriendsList } from 'src/components'
import { getProfileRequest } from 'src/redux/actions/profile/profileActions'
import { ProfileState } from 'src/redux/types'
import './App.less'

interface Props {
  loadProfile: Function
  user: ProfileState
  isSidebarCollapsed: boolean
}

const App: React.FC<Props> = props => {
  const { loadProfile } = props
  const [currentlySelected, setCurrent] = useState('friends')

  useEffect(() => {
    window.document.title = 'Venni'
    loadProfile()
  }, [loadProfile])

  const handleMenuItemClick = (event: any) => setCurrent(event.key)

  const renderContent = () => {
    const {
      user: { friends }
    } = props
    return <FriendsList friends={friends} />
  }

  const renderFriends = () => {
    const { friends } = props.user

    return friends.map(friend => (
      <Menu.Item key={friend.id}>
        <img
          alt={friend.name}
          src={friend.avatarUrl}
          className="app__sidebar__menu__item-avatar"
        />
        <span className="app__sidebar__menu__item-text">{friend.name}</span>
      </Menu.Item>
    ))
  }

  const { Content, Sider } = Layout
  const { SubMenu } = Menu

  return (
    <Layout className="app">
      <Sider
        className="app__sidebar"
        width={250}
        style={{
          overflow: 'auto',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 48,
          zIndex: 2
        }}
        trigger={null}
        collapsedWidth={0}
        collapsed={props.isSidebarCollapsed}
        collapsible
      >
        <Menu
          className="app__sidebar__menu"
          mode="inline"
          defaultSelectedKeys={['friends']}
          defaultOpenKeys={['dms']}
          style={{
            height: '100%',
            borderRight: 0
          }}
        >
          <Menu.Item
            key="friends"
            className="app__sidebar__menu__item--friends"
            onClick={event => handleMenuItemClick(event)}
          >
            <Icon type="team" /> Your Friends
          </Menu.Item>
          <SubMenu
            key="dms"
            title={
              <span className="app__sidebar__menu__item--group">
                <Icon type="message" /> Direct Messages
              </span>
            }
          >
            {renderFriends()}
          </SubMenu>
        </Menu>
      </Sider>
      <Content
        className={props.isSidebarCollapsed ? 'padding-0' : 'padding-250'}
        style={{ paddingTop: 64 }}
      >
        <div className="app__content">{renderContent()}</div>
      </Content>
    </Layout>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  loadProfile: () => dispatch(getProfileRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
