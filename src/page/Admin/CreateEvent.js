import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Button, Form, Row, Col, Alert} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import CreateEventMutation from '../../graphql/mutations/CreateEvent'


const CreateEvent = (props) => {
  const [ eventid, setEventid ] = useState(0)
  const [ nameTH, setNameTH ] = useState('')
  const [ nameEN, setNameEN ] = useState('')
  const [ start_date, setStartDate ] = useState('')
  const [ end_date, setEndDate ] = useState('')
  const [createEvent] = useMutation(CreateEventMutation)
  
  const  handleStartChange =(date) => {
    setStartDate(date)
    console.log(start_date)
  }
  const  handleEndChange =(date) => {
    setEndDate(date)
    console.log(end_date)
  }

  return(
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={{marginTop:'40%'}}>
          <Form style={{backgroundColor:'rgb(64, 64, 64, 0.5)', padding:'30px'}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>EventID</Form.Label>
              <Form.Control type="text" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setEventid(x.currentTarget.value) } } />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>nameTH</Form.Label>
              <Form.Control type="text" placeholder="eventNameTH" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setNameTH(x.currentTarget.value) } }  />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>nameEN</Form.Label>
              <Form.Control type="text" placeholder="eventNameEN" onChange={ (x: React.FormEvent<FormControl & HTMLInputElement>) => { setNameEN(x.currentTarget.value) } } />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>startdate</Form.Label>
              <DatePicker
                selected={ start_date }
                onChange={ handleStartChange }
                name="startDate"
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>enddate</Form.Label>
              <DatePicker
                selected={ end_date }
                onChange={ handleEndChange }
                name="endDate"
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </Form.Group>
            
            

            <Button variant="primary" type="submit" style={{width:'100%'}}
              onClick={async (e) => {
                e.preventDefault()
                try {
                  await createEvent({
                    variables: {
                      id: Number(eventid),
                      nameTH: nameTH,
                      nameEN: nameEN,
                      start_date: start_date,
                      end_date: end_date
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

export default CreateEvent