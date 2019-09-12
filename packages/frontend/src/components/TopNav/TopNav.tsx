import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { History } from 'history'
import { AuthState } from 'src/redux/types'
import Logo from 'src/assets/logo.svg'

interface Props {
  history: History
  authState: AuthState
}

interface State {
  current: string
}

const availableLocations = ['/', '/login', '/signup']

class TopNav extends React.Component<Props, State> {
  state = { current: '/' }

  componentDidMount() {
    this.setState({ current: this.props.history.location.pathname })

    this.props.history.listen(location => {
      const current = availableLocations.includes(location.pathname)
        ? location.pathname
        : '/'

      this.setState({ current })
    })
  }

  handleClick = (e: any) => {
    this.setState({ current: e.key })
  }

  renderLinks = () => {
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

    if (!this.props.authState.token) return menuLinks.map(l => l)

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
        <Menu.Item key="/">
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
