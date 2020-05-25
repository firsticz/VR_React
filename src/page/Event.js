import React, { useContext } from 'react';
import { useQuery } from 'react-apollo'
import { Spinner, Row, Col, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import getEvent from '../graphql/queries/getMyEvent'
import AuthContext from '../context/AuthContext'
import moment from 'moment'




const Event = props => {
  const { user } = useContext(AuthContext)
  const { data = { eventMany: []}, loading } = useQuery(getEvent,{
    variables: {
      userId: Number(user.id),
    }
  })
  // const { user } = useContext(AuthContext)
 


  return(
    <div style={{backgroundColor:'#afeeee',paddingBottom:'10%'}}>
    <Container style={{marginLeft:'11%'}}>
      <h1 style={{paddingTop:'50px',marginLeft:'36%'}}>... My Event ...</h1>
      <Row>
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          
          data.eventMany.map((item, index)=>(
            <Link to={`/event/${item.eventId}`} style={{ textDecoration: 'none', color:'inherit' }} key={index}>
              <Col xs={12} md={4} style={{paddingTop:'50px'}}>
                <Card style={{ width: '18rem' ,borderRadius:'25px',border:'10px',width:'320px',height:'250px',boxShadow:'5px 5px 5px grey'}} >
                  <Card.Img variant="top" style={{width:'100%',height:'150px',borderRadius:'25px 25px 0px 0px'}} src={`${item.banner}`} />
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
    </div>
  )

}

export default Event;