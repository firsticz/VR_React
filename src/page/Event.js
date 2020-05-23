import React, { useContext } from 'react';
import { useQuery } from 'react-apollo'
import { Spinner, Row, Col, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import getEvent from '../graphql/queries/getEvent'
import AuthContext from '../context/AuthContext'
import moment from 'moment'




const Event = props => {
  const { data = { eventMany: []}, loading } = useQuery(getEvent)
  // const { user } = useContext(AuthContext)
 


  return(
    <Container style={{marginLeft:'15%'}}>
      <Row>
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          
          data.eventMany.map((item, index)=>(
            <Link to={`/event/${item.eventId}`} style={{ textDecoration: 'none', color:'inherit' }} key={index}>
              <Col xs={12} md={4} style={{paddingTop:'50px'}}>
                <Card style={{ width: '18rem' }} >
                  <Card.Img variant="top" src={`${item.banner}`} />
                  <Card.Body>
                    <Card.Title>{item.NameTH+' - ' +item.NameEN}</Card.Title>
                    <Card.Text>
                      {moment(item.start_date).format('YYYY/MM/DD') +' - ' + moment(item.end_date).format('YYYY/MM/DD')}
                    </Card.Text> 
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            
          ))
        )}
        
      </Row>

    </Container>
  )

}

export default Event;