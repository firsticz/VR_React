import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from 'react-apollo'
import { Spinner, Table, Button, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
// import moment from 'moment'
import AuthContext from '../context/AuthContext'
import getactivityhasevent from '../graphql/queries/getActivityhasevent'
import RegisterEvent from '../graphql/mutations/RegisterEvent'
import _ from 'lodash'

const EventDetail = props => {
  const { history } = props
  const { eventId } = props.match.params
  const { user } = useContext(AuthContext)
  const { data = { activityhasevent: []}, loading } = useQuery(getactivityhasevent,{
    variables: {
      eventId: Number(eventId)
    }
  })
  const [ registerEvent ] = useMutation(RegisterEvent)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleOK = async () => {
    try{
      await registerEvent({
        variables: {
          eventid: Number(eventId),
          userid: user.id
        },
      })
      alert('success')
      handleClose()
      history.push('/event')
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
  return (
    <Container>
      <Button onClick={handleShow} variant="primary" disabled={data.activityhasevent.find(ele => Number(ele._id) === user.id) !== undefined}>สมัคร</Button>
      {console.log(data)}
      <Table>
        <thead>
          <tr  style={{backgroundColor:'#FFA500',color:'#222'}}>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>distance (Km)</th>
          </tr>
        </thead>
        <tbody style={{padding:'1'}}>
            {loading?(
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ):(
            data.activityhasevent.map((item, index)=>(
            <>
            <tr key={index} style={{}}>
              <td>{item._id}</td>
              <td>{item.profile[0].firstname}</td>
              <td>{item.profile[0].lastname}</td>
              <td>{Number(_.sumBy(item.activities,'distance') / 1000).toFixed(2)}</td>
            </tr>
            {/* <p>{item.activities.map((items,i)=>(
              <li>
                {items.distance}
              </li>
            ))}</p> */}
            </>
            ))
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการสมัคร</Modal.Title>
        </Modal.Header>
        <Modal.Body>ยืนยันการสมัคร</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleOK}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default EventDetail