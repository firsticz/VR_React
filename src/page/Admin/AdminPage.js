import React, { useContext } from 'react'
import { Link, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'
import PrivateAdminRoute from '../../component/PrivateAdminRoute'
import AuthContext from '../../context/AuthContext'
import CreateEvent from './CreateEvent'
import CreateGroup from './CreateGroup'

const AdminPage = (props) => {

  return (
    <Container>
      <Link to={`/admin/createevent`}>
        <Button>Create Event</Button>
      </Link>
      <Link to={`/admin/creategroup`} style={{marginLeft: '10px'}}>
        <Button>Create Group</Button>
      </Link>

      <Switch>
        <PrivateAdminRoute path="/admin/createevent" component={CreateEvent} />
        <PrivateAdminRoute path="/admin/creategroup" component={CreateGroup} />
      </Switch>
    </Container>
  )
}

export default AdminPage