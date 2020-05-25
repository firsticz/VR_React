import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Button, Form, Row, Col, Alert} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import '../group.css'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import loginMutation from '../graphql/mutations/login'

const Login = (props) => {
  const { history } = props
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('');
  const [login, { data, loading }, error] = useMutation(loginMutation)
  const { setToken } = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data: { login: token } } = await login({ variables: { username, password } })
      console.log(token.token)
      setToken(token.token)
      history.push('/')
    } catch (err) {
      console.error(err)
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
  }
  // if(show){
  //   return (
      
  //   )
  // }

  return (
    <div style={{backgroundColor:'#66CCFF'}}>
  <Container>
      
      <Row className="justify-content-md-center">
        <Col md="auto" style={{marginBottom:'20%'}}>
          <div style={{marginTop:'30%',width:'350px'}}>
          <Form style={{backgroundColor:'#404040',padding:'30px',boxShadow:'1px 4px 10px 10px Orange'}}>
            <div>  
              <a href={`${process.env.REACT_APP_AUTH_URL}`} class="button" >
                  <img alt="connect" src="/images/stravaconnect.png"  style={{width:'100%'}}/>
              </a>
            </div>
            <div style={{color:'#f9a11e',fontWeight:'bold'}}>———————— or ————————</div>
        
            <Form.Group controlId="formBasicEmail">
         
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Username"
                onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setUsername(x.currentTarget.value) } }
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{marginTop:'-20px'}}>
              <Form.Label></Form.Label>
              <Form.Control
              type="password"
              placeholder="Password"
              onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setPassword(x.currentTarget.value) } }
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{width:'100%'}} onClick={handleSubmit}>
              Login
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
    </div>
  
  )
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape(),
}
Login.defaultProps = {
  history: {},
}
export default withRouter(Login)