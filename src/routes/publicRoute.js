/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from 'utilities';

const PublicRoute = ({ component: Component, ...rest }) => {
  if (isLoggedIn()) {
    return (<Redirect to="app" />);
  }
  return (<Route {...rest} component={Component} />);
};

export default PublicRoute;
