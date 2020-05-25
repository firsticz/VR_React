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
    <div style={{backgroundColor:'#afeeee',paddingBottom:'20%'}}>
    <Container style={{marginLeft:'11%'}}>
      <Row>
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          
          data.groupMany.map((item, index)=>(
            <Link to={`/group/${item.groupId}`} style={{ textDecoration: 'none', color:'inherit' }} key={index}>
              <Col xs={12} md={4} style={{paddingTop:'50px'}}>
                <Card style={{ width: '18rem' ,borderRadius:'25px',border:'10px',width:'320px',height:'250px',boxShadow:'5px 5px 5px grey'}} >
                  <Card.Img variant="top" src="/images/1.jpg" style={{width:'100%',height:'150px',borderRadius:'25px 25px 0px 0px'}}/>
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
    </div>
  )

}

export default Group