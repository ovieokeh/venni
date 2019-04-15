/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from 'utilities';

const AppRoute = ({ component: Component, ...rest }) => {
  if (isLoggedIn()) {
    return (<Route {...rest} component={Component} />);
  }
  return (<Redirect to="home" />);
};

export default AppRoute;
