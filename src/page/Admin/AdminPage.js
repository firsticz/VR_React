import React, { useContext } from 'react'
import { Link, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'
import PrivateAdminRoute from '../../component/PrivateAdminRoute'
import AuthContext from '../../context/AuthContext'
import CreateEvent from './CreateEvent'
import CreateGroup from './CreateGroup'
import UpdateEvent from './UpdateEvent'
import UpdateGroup from './UpdateGroup'
import EventList from './EventList'



const AdminPage = (props) => {

  return (
    <div style={{backgroundColor:'#fff',paddingBottom:'40%'}}>
    <Container>
      <Link to={`/admin/createevent`}>
        <Button style={{backgroundColor:'red'}}>Create Event</Button>
      </Link>
      <Link to={`/admin/creategroup`} style={{marginLeft: '10px'}}>
        <Button style={{margin:'10px', backgroundColor:'red'}}>Create Group</Button>
      </Link>
      <Link to={`/admin/updateevent`}>
        <Button style={{margin:'10px', backgroundColor:'green'}}>Update Event</Button>
      </Link>
      <Link to={`/admin/updategroup`} style={{marginLeft: '10px'}}>
        <Button style={{backgroundColor:'green'}}>Update Group</Button>
      </Link>

      <Switch>
        
        <PrivateAdminRoute path="/admin/createevent" component={CreateEvent} />
        <PrivateAdminRoute path="/admin/creategroup" component={CreateGroup} />
        <PrivateAdminRoute path="/admin/updateevent/:eventId" component={UpdateEvent}/>
        <PrivateAdminRoute path="/admin/updateevent" component={EventList}/>
        <PrivateAdminRoute path="/admin/updategroup" component={UpdateGroup} />

       
      </Switch>
    </Container>
    </div>
  )
}

export default AdminPage