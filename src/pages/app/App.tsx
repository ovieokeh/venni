// third-party libraries
import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'

// custom imports
import { FirebaseCtx } from 'src/firebase/interfaces'
import { withFirebase } from 'src/firebase'
import { FriendsList } from 'src/components'
import { UserProfile, SocialState, ReduxState } from 'src/redux/types'
import { useSubscriptions } from './subscriptions'
import './App.less'

interface Props {
  user: UserProfile
  social: SocialState
  isSidebarCollapsed: boolean
  firebase: FirebaseCtx
}

export const App: React.FC<Props> = props => {
  window.document.title = 'Venni'
  useSubscriptions(props.firebase)

  const handleMenuItemClick = (event: any) => {}

  const renderContent = () => {
    const { social } = props
    return <FriendsList friends={social.friends} />
  }

  const renderFriends = () => {
    const {
      social: { friends }
    } = props

    return friends.map(friend => (
      <Menu.Item key={friend.id}>
        <img
          alt={friend.name}
          src={friend.avatar}
          className="app__sidebar__menu__item-avatar image-30"
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

const mapStateToProps = (state: ReduxState) => ({
  user: state.profile,
  social: state.social
})

export default connect(mapStateToProps)(withFirebase(App))
