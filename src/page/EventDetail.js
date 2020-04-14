import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo'
import { Spinner, Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
// import moment from 'moment'
import getactivityhasevent from '../graphql/queries/getActivityhasevent'
import _ from 'lodash'

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
     
    </Container>
  )
}

export default EventDetail