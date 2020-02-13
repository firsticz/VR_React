import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import { Spinner, Button,Row, Col, Tab, Tabs, Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Navbar from '../component/Navbar'
import '../group.css'
import { Link } from 'react-router-dom'
import Check from '../handle/check'
import moment from 'moment'
import { NotificationManager } from 'react-notifications'


const GroupDetail = props => {
  const [ groupState, setGroupState ] = useState([]);
  const [ ranksState, setRankState ] = useState([]);
  const [ eventState, setEventState ] = useState([]);
  const [ eventActivityState, setEventActivityState ] = useState([]);
  const [ showLoading, setShowLoading ] = useState(true);
  const [ statusState, setStatusState ] = useState([]);


  useEffect(() => {
    setShowLoading(false);
    const { id } = props.match.params
    const requestOne = axios.get('http://localhost:4500/group/getgroupdetail');
    const requestTwo = axios.get('http://localhost:4500/rank/getrank');
    const requstThree = axios.get('http://localhost:4500/group/eventactivity')
    
    const fetchData = async () => {
      axios.all([requestOne, requestTwo, requstThree]).then(axios.spread((...responses) => {
        const group = responses[0].data;
        const rank = responses[1].data;
        const eventactivity = responses[2].data;
        group.forEach(element => {
          if(id === element.id){
            setGroupState(element);
            setEventState(element.event)
            element.event.forEach(async (ele) => {
              await handlestatus(ele.id);
            })
            
          }
        });
        setRankState(rank);
        setEventActivityState(eventactivity)

      }))
      
      setShowLoading(false);
    };

    fetchData();
  }, [props.match.params]);

  const changemonth = date =>{
    const d = moment(date);
    d.month();
    return d.format('MMM');
  };

  const handlejonevent = (eventid,e)=>{
    e.preventDefault();
    const userid = window.sessionStorage.getItem("id")
    axios.put('http://localhost:4500/group/joinevent/'+userid+'/'+eventid).then(response =>{
      NotificationManager.success('You Join Group Sucess', 'Successful!', 2000);
    }).catch(err => {
      NotificationManager.error('Error Join Group', 'Error!');
    })
    
  };

  // const handlejonevent = (eventid,e) => {
  //   e.preventDefault();
  //   const userid = window.localStorage.getItem("id")
  //   axios.put('http://localhost:4500/group/joinevent/'+userid+'/'+eventid);
  //   alert("join success")
  // }

  const handlestatus = (eventid, e) => {
    // e.preventDefault();
    const userid = window.sessionStorage.getItem("id")
    axios.get('http://localhost:4500/group/checkmember/'+userid+'/'+eventid).then(response => {
      const status =  response.data
      setStatusState(statusState => [...statusState, status])
    });

    
  }



  

  return (
    <div>
      { console.log(eventActivityState)}
      <Check/>
      <Navbar/>
      <Container bsPrefix="container contain">
      {showLoading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      }

      <div className='banner'>
        <img className='banner_img' src='/images/1.jpg' alt="group"></img>
        <div id="overlay">
          <div className='banner_group'>
            <h1>{groupState.name}</h1>
            <p>{groupState.discription}</p>
          </div>
        </div>
      </div>
        
      {/* {eventState.map((d, i)=>
        <div className='event' key={i}>
        <div className='event_list'>
          <img src='/images/1.jpg' alt="event"></img>
          <div className='content'>
            <h1>{d.name}</h1>
            <p>{d.start_date.substring(8,10) + ' ' + changemonth(d.start_date) +' - '+d.end_date.substring(8,10) + ' ' + changemonth(d.end_date)}</p>
            <Button variant="primary" onClick={(e) => handlejonevent(d.id, e)}  disabled={statusState[i]}>Join</Button>
          </div>
        </div>
      </div>
      )} */}

      <Row className='event_row'>
        <Col xs={8}>
          <Row>
            {eventState.map((d,i)=>
              <Col xs={6}>
                <div className='event'>
                  <div className='event_list'>
                    <img className='event_img' alt='' src='/images/1.jpg'></img>
                    <div className='content'>
                      <h1>{d.name}</h1>
                      <p>{d.start_date.substring(8,10) + ' ' + changemonth(d.start_date) +' - '+d.end_date.substring(8,10) + ' ' + changemonth(d.end_date)}</p>
                      <Button variant="primary" onClick={(e) => handlejonevent(d.id, e)}  disabled={statusState[i]}>Join</Button>
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Col>

        <Col>
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Leaderboard">
            <h3>Display</h3>
            <Table responsive>
              {ranksState.map((e,i)=>
                <tr>
                <td>{i+1}</td>
                <td className=''><img className='icon_profile_img' src={e.profile_medium} alt=''></img></td>
                <td>{e.firstname +' '+e.lastname}</td>
                <td>{(Number(e.totaldistance)/1000).toFixed(2) +' km'}</td>  
              </tr>
              )}

            </Table>
            </Tab>
            <Tab eventKey="activity" title="Recent Acivity">
              <div className='activity_list'>
                <Row>
                  <Col>
                  <img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G2.png'></img>
                  </Col>
                  <Col>
                  <p>;lKASLKAA</p>
                  <p>;lKASLKAA</p>
                  <p>;lKASLKAA</p>
                  <p>;lKASLKAA</p>
                  </Col>
                  <Col>
                  <img className='icon_map_img' src='/UI_Runner_Profile_V2/icon/icon_profile/envelope.png'></img>
                  </Col>
                </Row>
              </div>
              <div className='kan_list'></div>
              <div className='activity_list'>
                <Row>
                  <Col>
                  <img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G2.png'></img>
                  </Col>
                  <Col>
                  <p>;lKASLKAA</p>
                  <p>;lKASLKAA</p>
                  <p>;lKASLKAA</p>
                  <p>;lKASLKAA</p>
                  </Col>
                  <Col>
                  <img className='icon_map_img' src='/UI_Runner_Profile_V2/icon/icon_profile/envelope.png'></img>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey="member" title="Member">
              <div>Admins</div>
              <div> 
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G2.png'></img></td>
                <td>Name</td>
                <td>Admin</td>  
              </tr>
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G2.png'></img></td>
                <td>Name</td>
                <td>Admin</td>  
              </tr>
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G2.png'></img></td>
                <td>Name</td>
                <td>Admin</td>  
              </tr>
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G2.png'></img></td>
                <td>Name</td>
                <td>Admin</td>  
              </tr>
              </div>
              <div>Members</div>
              <div> 
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G1.png'></img></td>
                <td>Name</td>
                <td>Member</td>  
              </tr>
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G1.png'></img></td>
                <td>Name</td>
                <td>Member</td>  
              </tr>
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G1.png'></img></td>
                <td>Name</td>
                <td>Member</td>  
              </tr>
              <tr>
                <td className='td_icon_profile'><img className='icon_profile_img' src='/UI_Runner_Profile_V2/icon/icon_profile/G1.png'></img></td>
                <td>Name</td>
                <td>Member</td>  
              </tr>
              </div>


            </Tab>
          </Tabs>
          </Col>



      </Row>
      
      </Container>
    </div>
  )
}

export default GroupDetail