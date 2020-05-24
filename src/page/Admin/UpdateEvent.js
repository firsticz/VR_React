import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Button, Form, Row, Col, Alert} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import UpdateEventMutation from '../../graphql/mutations/UpdateEvent'
import getEvent from '../../graphql/queries/getEventOne'

import base64Img from 'base64-img'


const UpdateEvent = (props) => {
  const { history } = props
  const { eventId } = props.match.params
  const [ status, setStatus ] = useState(true)
  const [ eventid, setEventid ] = useState(0)
  const [ nameTH, setNameTH ] = useState('')
  const [ nameEN, setNameEN ] = useState('')
  const [ start_date, setStartDate ] = useState('')
  const [ end_date, setEndDate ] = useState('')
  const [updateEvent] = useMutation(UpdateEventMutation)
  const { data = { eventOne: {}}, loading } = useQuery(getEvent,{
    variables: {
      eventId: Number(eventId),
    }
  })
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('');
  const [ file, setFile ] = useState([])
  const [ banner, setBanner ] = useState('')
  
  const  handleStartChange =(date) => {
    setStartDate(date)
    console.log(start_date)
  }
  const  handleEndChange =(date) => {
    if(date < start_date) {
      setMessage('Please Enter New Date')
      setShow(true)
    } else {
      setEndDate(date)
      console.log(end_date)
    }
    
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

if(loading ){
  return <p>loading</p>
}

  return(
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={{marginTop:'40%'}}>
          <Form style={{backgroundColor:'rgb(64, 64, 64, 0.5)', padding:'30px'}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>EventID<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <Form.Control value={Number(data.eventOne.eventId)} disabled type="text" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setEventid(Number(data.eventOne.eventId)) } } />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>nameTH<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <Form.Control value={data.eventOne.NameTH} type="text" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setNameTH(x.currentTarget.value) } }  />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>nameEN<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <Form.Control value={data.eventOne.NameEN} type="text" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setNameEN(x.currentTarget.value) } } />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>startdate<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <DatePicker
                selected={ start_date }
                onChange={ handleStartChange }
                name="startDate"
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>enddate<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <DatePicker
                selected={ end_date }
                onChange={ handleEndChange }
                name="endDate"
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="form-control"

              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>file<font color='red' style={{padding:'5px'}} >*</font></Form.Label>
              <Form.Control type="file" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { getFiles(x.currentTarget.files[0]) } } />
            </Form.Group>

            

            <Button variant="primary" type="submit" style={{width:'100%'}}
              onClick={async (e) => {
              
                e.preventDefault()
                if(nameTH ===('') && nameEN ===('') && start_date===('') && end_date===('')){
                  setMessage('Please Enter again')
                  setShow(true)
                 
                }
                else {
                  // const result = await toBase64(file).catch(e => Error(e))
                  // setBanner(result.toString())
                  // console.log(banner)
                  try {
                    await updateEvent({
                      variables: {
                        id: Number(eventId),
                        nameTH: nameTH,
                        nameEN: nameEN,
                        start_date: start_date,
                        end_date: end_date,
                        banner: banner
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

export default UpdateEvent