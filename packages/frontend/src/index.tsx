import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import AOS from 'aos'
import { Homepage, Error, Login } from './pages'
import { TopNav } from './components'
import * as serviceWorker from './serviceWorker'
import './index.css'
import 'aos/dist/aos.css'

export const history = createBrowserHistory()

const App: React.SFC = () => {
  useEffect(() => {
    AOS.init({ offset: 200, duration: 300, easing: 'ease-in-sine', delay: 100 })
  }, [])

  return (
    <Router history={history}>
      <TopNav history={history} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" render={() => <Login history={history} />} />
        <Route render={() => <Error history={history} />} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
