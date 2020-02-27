import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { checkToken, removeToken } = useContext(AuthContext)
  const { user } = checkToken()
  if (!user) {
    removeToken()
    return (<Redirect to="/login" />)
  }
  return (
    <Route
      {...rest}
      render={props => (<Component {...props} />)}
    />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.func,
}
PrivateRoute.defaultProps = {
  component: null,
}

export default PrivateRoute
