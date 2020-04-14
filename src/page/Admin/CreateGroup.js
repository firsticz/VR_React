import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Button, Form, Row, Col, Alert} from 'react-bootstrap'

import CreateGroupMutation from '../../graphql/mutations/CreateGroup'

const CreateGroup = (props) => {
  const [ groupid, setGroupid ] = useState('')
  const [ name, setName ] = useState('')
  const [createGroup] = useMutation(CreateGroupMutation)

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={{marginTop:'40%'}}>
          <Form style={{backgroundColor:'rgb(64, 64, 64, 0.5)', padding:'30px'}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>GroupID</Form.Label>
              <Form.Control type="text" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setGroupid(x.currentTarget.value) } } />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>name</Form.Label>
              <Form.Control type="text" placeholder="name" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setName(x.currentTarget.value) } }  />
            </Form.Group>
            
            <Button variant="primary" type="submit" style={{width:'100%'}}
              onClick={async (e) => {
                e.preventDefault()
                try {
                  await createGroup({
                    variables: {
                      groupId: groupid,
                      name: name
                    }
                  })
                  alert('success')
                } catch (err) {
                  console.log(err)
                  const { networkError, graphQLErrors: [gqlError] } = err
                  if (networkError) {
                    // this.setState({ open: true, message: 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้' })
                  } else if (gqlError) {
                    // this.setState({ open: true, message: gqlError.message })
                    console.log(gqlError.message)
                  }
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

export default CreateGroup