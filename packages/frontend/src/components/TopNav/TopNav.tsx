import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { History } from 'history'
import { AuthState } from 'src/redux/types'
import Logo from 'src/assets/logo.svg'

export interface Props {
  history: History
  authState: AuthState
  currentLocation: string
}

interface State {
  current: string
}

export class TopNav extends React.Component<Props, State> {
  state = { current: this.props.currentLocation }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentLocation !== this.props.currentLocation) {
      this.setState({ current: this.props.currentLocation })
    }
  }

  handleClick = (e: any): void => this.setState({ current: e.key })

  renderLinks = (): ReactElement[] | ReactElement => {
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

    if (!this.props.authState.token) return menuLinks

    return (
      <Menu.Item key="/auth">
        <span>Is Auth</span>
      </Menu.Item>
    )
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="/home">
          <Link to="/">
            <img src={Logo} alt="Venni Logo" style={{ width: '30px' }} />
          </Link>
        </Menu.Item>

        {this.renderLinks()}
      </Menu>
    )
  }
}

const mapStateToProps = (state: any) => ({
  authState: state.auth
})

export default connect(mapStateToProps)(TopNav)
