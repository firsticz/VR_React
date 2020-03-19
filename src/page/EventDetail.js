import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo'
import { Spinner, Jumbotron, Button, Row, Col, Card} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import moment from 'moment'
import getactivityhasevent from '../graphql/queries/getActivityhasevent'

const EventDetail = props => {
  const { eventId } = props.match.params
  const { data = { activityhasevent: []}, loading } = useQuery(getactivityhasevent,{
    variables: {
      eventId: Number(eventId)
    }
  })
  return (
    <Container>
      {console.log(data)}
      {loading?(
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ):(
        data.activityhasevent.map((item, index)=>(
        <p>{item.activities.map((items,i)=>(
          <li>
            {items._id}
          </li>
        ))}</p>
        ))
      )}
    </Container>
  )
}

export default EventDetail