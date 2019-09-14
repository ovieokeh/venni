/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from 'src/utilities'

const AppRoute = ({ component: Component, ...rest }: any) => {
  if (isLoggedIn()) {
    return <Route {...rest} component={Component} />
  }
  return <Redirect to="home" />
}

export default AppRoute
