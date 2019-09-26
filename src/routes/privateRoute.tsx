/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from 'src/utilities'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  if (isLoggedIn()) {
    return <Route {...rest} component={Component} />
  }
  return <Redirect to="/login" />
}

export default PrivateRoute
