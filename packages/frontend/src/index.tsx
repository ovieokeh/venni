import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './index.css'
import { Homepage } from './pages'
import * as serviceWorker from './serviceWorker'

export const history = createBrowserHistory()

const App: React.SFC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
