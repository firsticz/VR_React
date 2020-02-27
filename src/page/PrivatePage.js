import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Switch
} from 'react-router-dom'
import PrivateRoute from '../component/PrivateRoute'
import AuthContext from '../context/AuthContext'
import Navbar from '../component/Navbar'
import GroupDetail from './GroupDetail'
import Group from './Group'

const PrivatePage = (props) => {
  const { user, removeToken } = useContext(AuthContext)

  return (
    <Fragment>
      <Navbar/>
        <p>{user.id}</p>
        <Switch>
          <PrivateRoute path="/group/:id/:eventid" component={GroupDetail} />
          <PrivateRoute path="/group/:id" component={GroupDetail} />
          <PrivateRoute path="/group" component={Group} />
        </Switch>
    </Fragment>
  )
}

export default PrivatePage