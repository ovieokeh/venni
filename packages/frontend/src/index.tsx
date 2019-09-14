import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import AOS from 'aos'
import store from './redux/store'
import { AppRoute, PublicRoute } from './routes'
import { Homepage, Error, Login, Signup, App } from './pages'
import { TopNav, Drawer } from './components'
import * as serviceWorker from './serviceWorker'
import { history } from './utilities/history'
import './index.css'
import 'aos/dist/aos.css'

const Routes: React.SFC = () => {
  AOS.init({ offset: 200, duration: 300, easing: 'ease-in-sine', delay: 100 })
  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname
  )

  useEffect(() => {
    history.listen(location => setCurrentLocation(location.pathname))
  }, [])

  return (
    <Router history={history}>
      <TopNav history={history} currentLocation={currentLocation} />
      <Drawer />
      <Switch>
        <AppRoute exact path="/" component={App} />
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

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
