import React, { useContext } from 'react';
import { useQuery } from 'react-apollo'
import { Spinner, Row, Col, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import gethome from '../graphql/queries/gethomedata'
import AuthContext from '../context/AuthContext'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRunning ,faCircle} from '@fortawesome/free-solid-svg-icons'




const Home = props => {
  const { data = { expEvent: [], nowevent: []}, loading } = useQuery(gethome)
  // const { user } = useContext(AuthContext)
 


  return(
    <Container style={{marginLeft:'11%'}}>
      <div style={{marginTop:'30px'}}>
                <p style={{fontSize:"30px",fontFamily:'NameTH',marginLeft:'36%',display:'inline',fontWeight:'bold'}}>งานวิ่งทั้งหมด</p>
                {<FontAwesomeIcon 
                    style={{fontSize:'40px', marginTop:'40px',marginLeft:'1%',marginBottom:'-5px'}} icon={faRunning} />}
                  <div style={{width:'192px',backgroundColor:'#ffa500',height:'5px',marginLeft:'36%',marginTop:'-2px'}}></div>
                        </div>
       <Row >
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          
          data.nowevent.map((item, index)=>(
            <Link to={`/event/${item.eventId}`} style={{ textDecoration: 'none', color:'inherit' }} key={index}>
              <Col xs={12} md={4} style={{paddingTop:'50px'}}>
                <Card style={{ width: '18rem' ,borderRadius:'25px',border:'10px',width:'320px',height:'250px',boxShadow:'5px 5px 5px grey'}} >
                  <Card.Img variant="top" style={{width:'100%',height:'150px',borderRadius:'25px 25px 0px 0px'}} src={`${item.banner}`} />
                  <Card.Body>
                    <Card.Title style={{fontWeight:'bold',fontSize:'20px'}}>{item.NameTH+' - ' +item.NameEN}</Card.Title>
                    <FontAwesomeIcon size="1x" icon={faCircle} color="#FFCC00" style={{display:'inline'}} />
                    <Card.Text style={{fontWeight:'bold',fontSize:'15px',display:'inline',padding:'10px'}}>
                      {moment(item.start_date).format('YYYY/MM/DD') +' - ' + moment(item.end_date).format('YYYY/MM/DD')}
                    </Card.Text> 
                    
                   
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            
          ))
        )}
        
      </Row>
      <div style={{marginTop:'30px'}}>
                <p style={{fontSize:"30px",fontFamily:'NameTH',marginLeft:'32%',display:'inline',fontWeight:'bold'}}>งานวิ่งที่ปิดรับสมัคร</p>
                {<FontAwesomeIcon 
                    style={{fontSize:'40px', marginTop:'40px',marginLeft:'1%',marginBottom:'-5px'}} icon={faRunning} />}
                  <div style={{width:'264px',backgroundColor:'#ffa500',height:'5px',marginLeft:'32%',marginTop:'-2px'}}></div>
      </div>
      <Row>
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          
          data.expEvent.map((item, index)=>(
            <Link to={`/home/${item.eventId}`} style={{ textDecoration: 'none', color:'inherit' }} key={index}>
               <Col xs={12} md={4} style={{paddingTop:'50px'}}>
                <Card style={{ width: '18rem' ,borderRadius:'25px',border:'10px',width:'320px',height:'250px',boxShadow:'5px 5px 5px grey'}} >
                  <Card.Img variant="top" style={{width:'100%',height:'150px',borderRadius:'25px 25px 0px 0px'}} src={`${item.banner}`} />
                  <Card.Body>
                    <Card.Title style={{fontWeight:'bold',fontSize:'20px'}}>{item.NameTH+' - ' +item.NameEN}</Card.Title>
                    <FontAwesomeIcon size="1x" icon={faCircle} color="#FFCC00" style={{display:'inline'}} />
                    <Card.Text style={{fontWeight:'bold',fontSize:'15px',display:'inline',padding:'10px'}}>
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

export default Home;