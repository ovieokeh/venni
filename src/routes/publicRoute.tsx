/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from 'src/utilities'

const PublicRoute = ({ component: Component, ...rest }: any) => {
  if (isLoggedIn()) {
    return <Redirect to="/" />
  }
  return <Route {...rest} component={Component} />
}

export default PublicRoute
