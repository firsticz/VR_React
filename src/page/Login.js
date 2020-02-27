import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Button, Form, Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import '../group.css'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import loginMutation from '../graphql/mutations/login'

const Login = (props) => {
  const { history } = props
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [login, { data, loading }] = useMutation(loginMutation)
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
      }
    }
  }

  return (
    <Container>
      
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={{marginTop:'50%'}}>
          <Form style={{backgroundColor:'#404040',padding:'30px'}}>
            <div>  
              <a href="http://localhost:4500/auth/strava" class="button" >
                  <img alt="connect" src="/images/stravaconnect.png"  style={{width:'100%'}}/>
              </a>
            </div>
            <div style={{color:'#f9a11e'}}>————— or ——————</div>
        
            <Form.Group controlId="formBasicEmail">
         
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter usernamae"
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
              Submit
            </Button>
          </Form>

          </div>
          
        </Col>
      </Row>
      
    </Container>
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