import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
function removetoken(){
  localStorage.clear();
  window.location.href = '/';
}
const Bar = () =>{
  return (
    <Navbar bg="light" expand="lg" sticky="top">
    <Navbar.Brand href="/"><img style={{width:'80px'}} src="/images/logothairun-(blue).png"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/group">Group</Nav.Link>
        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
        <Nav.Link href="/activity">Activity</Nav.Link>
      </Nav>
      <Nav.Link href="#" onClick={removetoken}>Sign Out</Nav.Link>
    </Navbar.Collapse>
    
  </Navbar>
  );
}

export default Bar;