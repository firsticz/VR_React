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
import LeaderBoard from './LeaderBoard'

const PrivatePage = (props) => {
  const { user, removeToken } = useContext(AuthContext)

  return (
    <div>
      <Navbar/>
        <p>{user.id}</p>
        <p>{user.accesstoken}</p>
        <Switch>
          <PrivateRoute path="/leaderboard" component={LeaderBoard} />
          <PrivateRoute path="/group/:id/:eventid" component={GroupDetail} />
          <PrivateRoute path="/group/:id" component={GroupDetail} />
          <PrivateRoute path="/group" component={Group} />
        </Switch>
    </div>
  )
}

export default PrivatePage