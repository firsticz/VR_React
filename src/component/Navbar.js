import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { OverlayTrigger } from 'react-bootstrap'
import renderTooltip from './tooltip'
function removetoken(){
  localStorage.clear();
  window.location.href = '/home';
}
const Bar = (props) =>{
  return (
    <Navbar style={{backgroundColor:'#FFCC33',height:'90px',fontWeight:'bold'}} expand="lg" sticky="top">
    <Navbar.Brand href="/"><img style={{width:'80px'}} src="/images/logothairun-(blue).png" alt="logo"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/" style={{color:'#000',fontSize:'18px'}}>Home</Nav.Link>
        <Nav.Link href="/event" style={{color:'#000',fontSize:'18px'}}>Event</Nav.Link>
        <Nav.Link href="/group" style={{color:'#000',fontSize:'18px'}}>Group</Nav.Link>
        <Nav.Link href="/leaderboard" style={{color:'#000',fontSize:'18px'}}>Leaderboard</Nav.Link>
        <Nav.Link href="/activity" style={{color:'#000',fontSize:'18px'}}>Activity</Nav.Link>
        {props.role === 'ADMIN'?<Nav.Link href="/admin" style={{color:'#000',fontSize:'18px'}}>Admin</Nav.Link>:null}
      </Nav>
      <Nav.Link href="#"  onClick={removetoken} style={{color:'#fff',fontSize:'18px'}}>Sign Out</Nav.Link>
      {/* <OverlayTrigger 
       placement="bottom"
       delay={{ show: 250, hide: 400 }}
       overlay={renderTooltip}
       >
        <Nav><img style={{width:'50px', borderRadius:'50px'}} src={`${props.profile}`} alt="profile"></img></Nav>
      </OverlayTrigger> */}
    </Navbar.Collapse>
    
  </Navbar>
  );
}

export default Bar;