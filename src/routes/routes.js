import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import { Homepage } from 'components/presentational';
import { Notfound, Nav } from 'components/common';
import '../theme/style.scss';

const Routes = ({ history }) => (
  <Router history={history}>
    <React.Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route component={Notfound} />
      </Switch>
    </React.Fragment>
  </Router>
);

Routes.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

export default Routes;
