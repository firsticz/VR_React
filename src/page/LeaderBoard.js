import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Table, Spinner } from 'react-bootstrap'
import getLeaderBoard from '../graphql/queries/getLeaderBoard'

const LeaderBoard = (props) => {
  const [ showLoading, setShowLoading ] = useState(true);
  const { data = { leaderboard: []}, loading } = useQuery(getLeaderBoard)
  useEffect(()=>{
    setShowLoading(false);
  },[])
  return (
      <Container>
        <div>
          <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>distance (Km)</th>
            </tr>
          </thead>
          <tbody>
            {loading?(
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ):(
              data.leaderboard.map((item, index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{Number(item.totaldistance / 1000).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
          </Table>
        </div>
      </Container>
  )
}
export default LeaderBoard