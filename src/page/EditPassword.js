import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Button, Form, Row, Col} from 'react-bootstrap';

import setPasswordMutation from '../graphql/mutations/setPassword'

const EditPassword = (props) => {
  const [userid, setUserid] = useState(0)
  const [password, setPass] = useState('')
  const [status, setStatus] = useState(true)
  const query = queryString.parse(window.location.search);
  if (query.token) {
    window.sessionStorage.setItem("jwt", query.token);
    window.sessionStorage.setItem("id", query.userid);
    if(status){
      setUserid(Number(query.userid))
      setStatus(false)
    }
  }
  const [setPassword, { data, loading }] = useMutation(setPasswordMutation)
  if(window.sessionStorage.getItem("jwt")){
    return (
      <Container>
      
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={{marginTop:'50%'}}>
          <Form style={{backgroundColor:'#404040',padding:'30px'}}>
            <Form.Group controlId="formBasicEmail">
         
              <Form.Label>userid</Form.Label>
              <Form.Control type="text" value={userid} disabled />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{marginTop:'-20px'}}>
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Enter Password" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setPass(x.currentTarget.value) } } />
            </Form.Group>

            <Button variant="primary" type="submit" style={{width:'100%'}}
            onClick={async (e) => {
              e.preventDefault()
              try {
                await setPassword({
                  variables: {
                    id: userid, password: password
                  },
                })
                alert('success')
              } catch (err) {
                console.log(err)
              }
            }}
            >
              Submit
            </Button>
          </Form>

          </div>
          
        </Col>
      </Row>
      
    </Container>
    )
    
  }
}

export default EditPassword