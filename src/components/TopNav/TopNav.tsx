import React, { useState, useEffect, ReactElement, CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Menu, Icon, Avatar, Badge } from 'antd'
import { History } from 'history'
import { showDrawer as openDrawer } from 'src/redux/actions/drawer/drawerActions'
import { ReduxState, UserProfile, SocialState } from 'src/redux/types'
import Logo from 'src/assets/logo.svg'
import { isLoggedIn } from 'src/utilities'

export interface Props {
  history: History
  currentLocation: string
  userProfile: UserProfile
  social: SocialState
  isSidebarCollapsed: boolean
  setSidebarCollapse: Function
  showDrawer: () => void
}

const menuStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  paddingTop: 5
}

export const TopNav: React.FC<Props> = props => {
  const [current, setCurrent] = useState(props.currentLocation)
  const { currentLocation } = props

  useEffect(() => {
    setCurrent(currentLocation)
  }, [currentLocation])

  const handleLogoClick = () => {
    const {
      userProfile,
      history,
      setSidebarCollapse,
      isSidebarCollapsed
    } = props

    !userProfile.id
      ? history.push('/')
      : setSidebarCollapse(!isSidebarCollapsed)
  }

  const handleClick = (e: any): void => setCurrent(e.key)

  const renderLinks = (): ReactElement[] | ReactElement => {
    const { userProfile, social, showDrawer } = props

    const menuLinks = [
      <Menu.Item key="/signup">
        <Link to="/signup" style={{ color: 'green' }}>
          <Icon type="rocket" />
          Signup
        </Link>
      </Menu.Item>,

      <Menu.Item key="/login">
        <Link to="/login">
          <Icon type="login" />
          Login
        </Link>
      </Menu.Item>
    ]

    if (!isLoggedIn()) return menuLinks

    return (
      <Menu.Item onClick={showDrawer} key="/" style={{ float: 'right' }}>
        <Badge count={social.receivedInvites.length}>
          <Avatar className="avatar-img" src={userProfile.avatar}>
            {userProfile.name}
          </Avatar>
        </Badge>
      </Menu.Item>
    )
  }

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={menuStyle}
    >
      <Menu.Item key="/home">
        <img
          src={Logo}
          alt="Venni Logo"
          style={{ width: '30px' }}
          onClick={handleLogoClick}
        />
      </Menu.Item>

      {renderLinks()}
    </Menu>
  )
}

/* istanbul ignore next */
const mapStateToProps = (state: ReduxState) => ({
  userProfile: state.profile,
  social: state.social
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showDrawer: () => dispatch(openDrawer())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav)
