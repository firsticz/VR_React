import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Table, Spinner } from 'react-bootstrap'
import getMyActivity from '../graphql/queries/getMyActivity'

const Activity = (props) => {
  const [ showLoading, setShowLoading ] = useState(true);
  const { data = { activityMany: []}, loading } = useQuery(getMyActivity)
  useEffect(()=>{
    setShowLoading(false);
  },[])
  return(
    <Container>
      <div>
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          <Table>
            <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>distance (Km)</th>
            </tr>
            </thead>
            <tbody>
              {data.activityMany.map((item,index)=>(
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.start_date}</td>
                  <td></td>
                  <td>{Number(item.distance / 1000 ).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  )
}

export default Activity