import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Button, Form, Row, Col, Alert} from 'react-bootstrap'

import CreateGroupMutation from '../../graphql/mutations/CreateGroup'
import getGroupId from '../../graphql/queries/getGroupId'

const CreateGroup = (props) => {
  const [ status, setStatus ] = useState(true)
  const [ groupid, setGroupid ] = useState('')
  const [ name, setName ] = useState('')
  const [ banner, setBanner ] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('');
  const [createGroup] = useMutation(CreateGroupMutation)
  const { data = { groupOne: {}}, loading } = useQuery(getGroupId)


  if(!loading && status){
    setGroupid(data.groupOne.groupId + 1)
    setStatus(false)
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
  const  getFiles = async (files) => {
    const result = await toBase64(files).catch(e => Error(e))
    setBanner(`${result}`)
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={{marginTop:'40%'}}>
          <Form style={{backgroundColor:'rgb(64, 64, 64, 0.5)', padding:'30px',padding:'30px',boxShadow:'1px 4px 10px 10px blue'}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{fontWeight:'bold'}}>GroupID<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <Form.Control disabled type="text" value={ data.groupOne.groupId + 1 } onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setGroupid(x.currentTarget.value) } } />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label style={{fontWeight:'bold'}}>Name<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <Form.Control type="text" placeholder="name" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setName(x.currentTarget.value) } }  />
            </Form.Group>
            <Form.Group controlId="banner">
              <Form.Label style={{fontWeight:'bold'}}>banner<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <Form.Control type="file" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { getFiles(x.currentTarget.files[0]) } } />
            </Form.Group>
            
            <Button variant="primary" type="submit" style={{width:'100%'}}
              onClick={async (e) => {
                e.preventDefault()
                if(name ===('') && banner===('')){
                  setMessage('Please Enter again')
                  setShow(true)
                 
                }
                try {
                  await createGroup({
                    variables: {
                      groupId: groupid,
                      name: name,
                      banner: banner,
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
          {show=== true ? (
            <Alert variant="danger"  onClose={() => setShow(false)} dismissible>
              {message}
            </Alert>):null
          }


          </div>
          
        </Col>
      </Row>
    </Container>
  )
}

export default CreateGroup