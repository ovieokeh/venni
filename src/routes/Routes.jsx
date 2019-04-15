import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import { Homepage, Terms } from 'components/presentational';
import { Notfound, Navbar, Loader } from 'components/common';
import { Login, Signup, App } from 'components/container';
import PublicRoute from './publicRoute';
import AppRoute from './appRoute';
import 'antd/dist/antd.css';
import '../theme/style.less';

const Routes = ({ history }) => {
  return (
    <Router history={history}>
      <React.Fragment>
        <Navbar history={history} />
        <Route render={() => (
          <Loader>
            <Switch>
              <Route path="/home" component={Homepage} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/signup" component={Signup} />
              <Route path="/terms" component={Terms} />
              <AppRoute exact path="/" component={App} />
              <Route component={Notfound} />
            </Switch>
          </Loader>
        )}
        />
      </React.Fragment>
    </Router>
  );
};

Routes.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

export default Routes;
