import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import AOS from 'aos'
import store from './redux/store'
import { AppRoute, PublicRoute } from './routes'
import { Homepage, Error, Login, Signup, App } from './pages'
import { TopNav, Drawer } from './components'
import * as serviceWorker from './serviceWorker'
import { history, useWindowWidth } from './utilities'
import { ReduxState, AuthState } from './redux/types'
import setupSocket from './sockets/sockets'
import './index.css'
import 'aos/dist/aos.css'

interface Props {
  authState: AuthState
}

class ErrorHandler extends React.PureComponent {
  componentDidCatch() {
    window.localStorage.clear()
    window.location.reload()
  }

  render() {
    return this.props.children
  }
}

const Routes: React.FC<Props> = props => {
  const windowWidth = useWindowWidth()
  const [isSidebarCollapsed, setSidebarCollapse] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname
  )
  const { token } = props.authState

  useEffect(() => {
    AOS.init({ offset: 200, duration: 300, easing: 'ease-in-sine', delay: 100 })
    history.listen(location => setCurrentLocation(location.pathname))
    token && setupSocket(token)
  }, [token])

  useEffect(() => {
    windowWidth > 768 ? setSidebarCollapse(false) : setSidebarCollapse(true)
  }, [windowWidth])

  return (
    <Router history={history}>
      <TopNav
        {...{
          history,
          currentLocation,
          isSidebarCollapsed,
          setSidebarCollapse
        }}
      />
      <Drawer />
      <Switch>
        <AppRoute
          exact
          path="/"
          render={() => <App isSidebarCollapsed={isSidebarCollapsed} />}
        />
        <Route path="/home" component={Homepage} />
        <PublicRoute path="/login" render={() => <Login history={history} />} />
        <PublicRoute
          path="/signup"
          render={() => <Signup history={history} />}
        />
        <Route render={() => <Error history={history} />} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  authState: state.auth
})

const ConnectedRoutes = connect(mapStateToProps)(Routes)

ReactDOM.render(
  <ErrorHandler>
    <Provider store={store}>
      <ConnectedRoutes />
    </Provider>
  </ErrorHandler>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
