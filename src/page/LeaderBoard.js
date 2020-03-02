import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'

const LeaderBoard = (props) => {
  const [ showLoading, setShowLoading ] = useState(true);
  useEffect(()=>{
    setShowLoading(false);
  },[])
  return (
      <Container>
        <p>test</p>
      </Container>
  )
}
export default LeaderBoard