import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import AOS from 'aos'
import store from './redux/store'
import { Homepage, Error, Login, Signup } from './pages'
import { TopNav } from './components'
import * as serviceWorker from './serviceWorker'
import { history } from './utilities/history'
import './index.css'
import 'aos/dist/aos.css'

const App: React.SFC = () => {
  AOS.init({ offset: 200, duration: 300, easing: 'ease-in-sine', delay: 100 })

  return (
    <Router history={history}>
      <TopNav history={history} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" render={() => <Login history={history} />} />
        <Route path="/signup" render={() => <Signup history={history} />} />
        <Route render={() => <Error history={history} />} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
