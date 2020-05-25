import React, { useContext } from 'react'
import {
  Switch
} from 'react-router-dom'
import PrivateRoute from '../component/PrivateRoute'
import PrivateAdminRoute from '../component/PrivateAdminRoute'
import AuthContext from '../context/AuthContext'
import Navbar from '../component/Navbar'
import Group from './Group'
import LeaderBoard from './LeaderBoard'
import Activity from './Activity'
import Event from './Event'
import Home from './Home'
import EventDetail from './EventDetail'
import GroupDetail from './Group_detail'
import Admin from './Admin/AdminPage'

const PrivatePage = (props) => {
  const { user } = useContext(AuthContext)

  return (
    <div style={{
      // backgroundImage:`url(${process.env.PUBLIC_URL }/images/backgroud.jpg`,
      backgroundColor:'#F4F6F6',
      width:'100%',
      height:'100vh',
      display: 'block',
      overflowY: 'scroll'
    }}>
      <Navbar 
        // profile={`${user.profile}`} 
        role={`${user.role}`} />
        <Switch>
          <PrivateRoute path="/leaderboard" component={LeaderBoard} />
          {/* <PrivateRoute path="/group/:id/:eventid" component={GroupDetail} />
          <PrivateRoute path="/group/:id" component={GroupDetail} /> */}
          <PrivateRoute path="/group/:groupid" component={GroupDetail} />
          <PrivateRoute path="/group" component={Group} />
          <PrivateRoute path="/activity" component={Activity} />
          <PrivateRoute path="/event/:eventId" component={EventDetail} />
          <PrivateRoute path="/event" component={Event} />
          <PrivateAdminRoute path="/admin" component={Admin} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
    </div>
  )
}

export default PrivatePage