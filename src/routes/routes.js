import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import { Homepage, Terms } from 'components/presentational';
import { Notfound, Navbar, Loader } from 'components/common';
import { Login, Signup } from 'components/container';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import 'antd/dist/antd.css';
import '../theme/style.scss';

const Routes = ({ history }) => (
  <Router history={history}>
    <React.Fragment>
      <Navbar />
      <Route render={() => (
        <Loader>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={Signup} />
            <Route path="/terms" component={Terms} />
            <PrivateRoute path="/app" component={Notfound} />
            <Route component={Notfound} />
          </Switch>
        </Loader>
      )}
      />
    </React.Fragment>
  </Router>
);

Routes.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

export default Routes;
