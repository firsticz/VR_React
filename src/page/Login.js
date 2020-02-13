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
        <Col md={6}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      
    </Container>
  )
}
export default Login