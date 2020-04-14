import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { OverlayTrigger } from 'react-bootstrap'
import renderTooltip from './tooltip'
function removetoken(){
  localStorage.clear();
  window.location.href = '/';
}
const Bar = (props) =>{
  return (
    <Navbar bg="light" expand="lg" sticky="top">
    <Navbar.Brand href="/"><img style={{width:'80px'}} src="/images/logothairun-(blue).png" alt="logo"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/event">Event</Nav.Link>
        <Nav.Link href="/group">Group</Nav.Link>
        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
        <Nav.Link href="/activity">Activity</Nav.Link>
        {props.role === 'ADMIN'?<Nav.Link href="/admin">Admin</Nav.Link>:null}
      </Nav>
      <Nav.Link href="#" onClick={removetoken}>Sign Out</Nav.Link>
      <OverlayTrigger 
       placement="bottom"
       delay={{ show: 250, hide: 400 }}
       overlay={renderTooltip}
       >
        <Nav><img style={{width:'50px', borderRadius:'50px'}} src={`${props.profile}`} alt="profile"></img></Nav>
      </OverlayTrigger>
    </Navbar.Collapse>
    
  </Navbar>
  );
}

export default Bar;