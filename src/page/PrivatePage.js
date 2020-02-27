import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Switch, Route, Link, withRouter,
} from 'react-router-dom'
import PrivateRoute from '../component/PrivateRoute'
import AuthContext from '../context/AuthContext'
import Navbar from '../component/Navbar'

const PrivatePage = (props) => {
  const { user, removeToken } = useContext(AuthContext)

  return (
    <Fragment>
      <Navbar/>
        <p>{user.id}</p>
    </Fragment>
  )
}

export default PrivatePage