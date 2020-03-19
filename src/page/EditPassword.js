import React, { useState } from 'react';
import { useMutation } from 'react-apollo'
import queryString from 'query-string'
import Container from 'react-bootstrap/Container'
import { Button, Form, Row, Col, Alert} from 'react-bootstrap';

import setPasswordMutation from '../graphql/mutations/setPassword'

const EditPassword = (props) => {
  const { history } = props
  const [userid, setUserid] = useState(0)
  const [password, setPass] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState(true)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('');
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
          <Form style={{backgroundColor:'rgb(64, 64, 64, 0.8)', padding:'30px'}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>userid</Form.Label>
              <Form.Control type="text" value={userid} disabled />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setUsername(x.currentTarget.value) } } />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setPass(x.currentTarget.value) } } />
            </Form.Group>

            <Button variant="primary" type="submit" style={{width:'100%'}}
            onClick={async (e) => {
              e.preventDefault()
              try {
                await setPassword({
                  variables: {
                    id: userid, password: password, username: username, token: query.token
                  },
                })
                alert('success')
                history.push('/')
              } catch (err) {
                console.log(err)
                const { networkError, graphQLErrors: [gqlError] } = err
                if (networkError) {
                  // this.setState({ open: true, message: 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้' })
                } else if (gqlError) {
                  // this.setState({ open: true, message: gqlError.message })
                  console.log(gqlError.message)
                  setMessage(gqlError.message)
                  setShow(true)
                }
              }
            }}
            >
              Submit
            </Button>
          </Form>
          {show=== true ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              {message}
            </Alert>):null
          }

          </div>
          
        </Col>
      </Row>
      
    </Container>
    )
    
  }
}

export default EditPassword