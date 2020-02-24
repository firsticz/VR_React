import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Navbar from '../component/Navbar'
import '../group.css'
import { Link } from 'react-router-dom'

const Login = (props) =>{

  return (
    <Container>
      
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={{marginTop:'100px'}}>
          <Form style={{backgroundColor:'#404040',padding:'30px'}}>
            <div>  
              <a href="http://localhost:4500/auth/strava" class="button" >
                  <img alt="connect" src="/images/stravaconnect.png"  style={{width:'100%'}}/>
              </a>
            </div>
            <div style={{color:'#f9a11e'}}>————— or ——————</div>
        
            <Form.Group controlId="formBasicEmail">
         
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{marginTop:'-20px'}}>
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{width:'100%'}}>
              Submit
            </Button>
          </Form>

          </div>
          
        </Col>
      </Row>
      
    </Container>
  )
}
export default Login