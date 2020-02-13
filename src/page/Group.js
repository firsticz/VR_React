import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Spinner, Button, Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Navbar from '../component/Navbar'
import '../group.css'
import { Link } from 'react-router-dom'
import Check from '../handle/check'
import { NotificationManager } from 'react-notifications'

const Group = props =>{
  const [groupState, setGroupState] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  // const [ isShowingAlert, setisShowingAlert ] = useState(false);
  

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios.get('http://localhost:4500/group/getgroup');
      setGroupState(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const handlejoingroup = (groupid, event) => {
    event.preventDefault();
    const userid = window.sessionStorage.getItem("id");
    axios.put('http://localhost:4500/group/joingroup/'+userid+'/'+groupid).then(response =>{
      NotificationManager.success('You Join Event Sucess', 'Successful!', 2000);
    }).catch(err => {
      NotificationManager.error('Error Join Event', 'Error!');
    })
    
  }


  return(
    <div>
      <Check/>
      <Navbar/>
      <Container>
        {showLoading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> }
        <Row className='row_two'>
        {groupState.map((d,i) => 
         <Col xs={6} md={3} key={i}>
            <div className="group">
              <img src='/images/logo.png' className='group_img' alt="grouppic"></img>
              <div>
                <Link to={`/group/${d.id}`}>{d.name}</Link>
              </div>
              <div>
                    {d.discription}
              </div>
              <Button variant="primary" onClick={(e) => handlejoingroup(d.id, e)}>Join</Button>
            </div>
          </Col>
        )}
        </Row>        
          
        
      
      </Container>
      
      
    </div>
  )
}

export default Group;