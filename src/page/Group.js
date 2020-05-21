import React from 'react';
import { useQuery } from 'react-apollo'
import { Spinner, Button, Row, Col, Card} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import moment from 'moment'
import getGroup from '../graphql/queries/getGroup' 

const Group = () => {
  const { data = { groupMany: []}, loading } = useQuery(getGroup)

  // useEffect(()=>{
  //   setShowLoading(false)
  // },[])

  return(
    <Container>
      <Row>
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          
          data.groupMany.map((item, index)=>(
            <Link to={`/group/${item.groupId}`} style={{ textDecoration: 'none', color:'inherit' }} key={index}>
              <Col xs={12} md={4} style={{paddingTop:'50px'}}>
                <Card style={{ width: '18rem' }} >
                  <Card.Img variant="top" src="/images/1.jpg" />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {/* <Card.Text>
                      {moment(item.start_date).format('YYYY/MM/DD') +' - ' + moment(item.end_date).format('YYYY/MM/DD')}
                    </Card.Text>  */}
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

export default Group