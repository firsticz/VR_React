import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from 'react-apollo'
import { Spinner, Tabs, Button, Modal, Row, Col, Tab } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
// import moment from 'moment'
import AuthContext from '../context/AuthContext'
import getactivityhasevent from '../graphql/queries/getActivityhasevent'
import getEvent from '../graphql/queries/getEventOne'
import RegisterEvent from '../graphql/mutations/RegisterEvent'
import _ from 'lodash'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRunning, faClock, faRoad ,faCircle} from '@fortawesome/free-solid-svg-icons'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'


const EventDetail = props => {
  const { history } = props
  const { eventId } = props.match.params
  const { user } = useContext(AuthContext)
  const { data = { activityhasevent: [], MyteamLead:[], groupleader: [], eventOne: {}}, loading } = useQuery(getactivityhasevent,{
    variables: {
      eventId: Number(eventId),
      userId: Number(user.id),
    }
  })
  const { data: data2 = { eventOne: {}}, loading2 } = useQuery(getEvent,{
    variables: {
      eventId: Number(eventId),
    }
  })
  const [ registerEvent ] = useMutation(RegisterEvent)
  const [show, setShow] = useState(false)
  const [key, setKey] = useState('home')

  const [ statuscountmember, setStatusCountmember] = useState(true)
  let allmember = []

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleOK = async () => {
    try{
      await registerEvent({
        variables: {
          eventid: Number(eventId),
          userid:  Number(user.id)
        },
      })
      alert('success')
      handleClose()
      history.push('/event')
    } catch (err) {
      console.log(err)
      const { networkError, graphQLErrors: [gqlError] } = err
      if (networkError) {
        // this.setState({ open: true, message: 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้' })
      } else if (gqlError) {
        // this.setState({ open: true, message: gqlError.message })
        console.log(gqlError.message)
      }
    }
  }
  const calDate = (enddate, startdate) => {
    const end_date = new Date(enddate)
    const start_date = new Date(startdate)
    const diffTime = Math.abs(end_date - start_date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  const calDistance = (activities) => {
    const total = _.sumBy(activities, function(o) {return o.distance})
    return total
  }
  const calTotalDistance = (activitiesevent) => {
    let total = 0
    activitiesevent.forEach(element => {
      total = total + calDistance(element.activities)
    })
    return total
  }
  if(loading){
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  const customtotal = (cell, row) => {
    return (
    <p >{Number(_.sumBy(cell,'distance') / 1000).toFixed(2)}</p>
    )
  }
  const customtime = (cell, row) => {
    return (
    <p>{moment.utc(Number(_.sumBy(cell,'moving_time') * 1000)).format('HH:mm:ss')}</p>
    )
  }
  const customavg = (cell, row) => {
    return (
    <p>{Number((_.meanBy(cell,'average_speed') * 3600) / 1000 ).toFixed(2)}</p>
    )
  }

  const columns = [{
    dataField: '_id',
    text: '#',
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    },
    sort: true,
    sortFunc: (a, b, order) => {
      if (order === 'asc') {
        return b - a;
      }
      return a - b; // desc 
    }
  }, {
    dataField: 'profile[0].firstname',
    text: 'First Name',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    }
  }, {
    dataField: 'profile[0].lastname',
    text: 'Last Name',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    }
  }, {
    dataField: 'activities',
    text: 'distance (Km)',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    },
    formatter: customtotal
  }, {
    dataField: 'activities',
    text: 'Time',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    },
    formatter: customtime
  }, 
  // {
  //   dataField: 'activities',
  //   text: 'Average Speed (Km/h)',
  //   sort: true,
  //   headerStyle: {
  //     backgroundColor: 'rgb(255, 165, 0)'
  //   },
  //   formatter: customavg
  // }
]

const columns2 = [{
  dataField: 'groupDetail[0].name',
  text: 'Team Name',
  sort: true,
  headerStyle: {
    backgroundColor: 'rgb(255, 165, 0)'
  }
},{
  dataField: 'activity',
  text: 'distance',
  sort: true,
  headerStyle: {
    backgroundColor: 'rgb(255, 165, 0)'
  },
  formatter: customtotal
},
]


  const customTotals = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from } to { to } of { size } Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotals,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: data.activityhasevent.length
    }] 
  }
  const options2 = {
    paginationSize: 4,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotals,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: data.MyteamLead.length
    }] 
  }
  const options3 = {
    paginationSize: 4,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotals,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: data.groupleader.length
    }] 
  }


  const rowMyselfStyle = (row, rowIndex) => {
    row.index = rowIndex;
    const style = {};
    if (row.profile[0].firstname === user.name) {
      style.backgroundColor = 'rgba(54, 163, 173, .10)'
    } else {
      style.backgroundColor = 'transparent'
    }
    style.borderTop = 'none'

    return style;
  }
  const defaultSorted = [{
    dataField: 'activities',
    order: 'desc'
  }];
  const defaultSortedac = [{
    dataField: 'activity',
    order: 'desc'
  }];


const calrunner =(member) => {
    allmember = [...new Set(member)]
    console.log(allmember.length)
    return allmember.length
  }

  const calbetweenDate = (enddate) =>{
    const end = moment(enddate).format('YYYY/MM/DD')
    const today = moment()
    return Math.abs(today.diff(end, 'days')) + 1 
  }
  
  return (
    <div style={{paddingTop:'2%'}}>
      <Container>
       
       <h1 style={{marginLeft:'40%',Top:'25%',display:'inline',borderBottom:'5px  solid orange',marginTop:'10%'}}>{data2.eventOne.NameTH}</h1>
       
       <div style={{width:'100%',display:'inline'}}>
       <div  style={{float:"right", marginTop:'2%'}}>
      <FontAwesomeIcon size="1x" icon={faCircle} color="green"/>
        <b><p style={{display:'inline',marginLeft:'10px',marginRight:'30px'}}>start: {moment(data.eventOne.start_date).format('YYYY/MM/DD')}</p></b>
        <FontAwesomeIcon size="1x" icon={faCircle} color="red"  />
        <b><p style={{display:'inline',marginLeft:'10px'}}>end: {moment(data.eventOne.end_date).format('YYYY/MM/DD')}</p></b>
      </div>
       </div>
       <div style={{marginLeft:'70%'}}>
      <FontAwesomeIcon size="2x" icon={faClock}  style={{color:'red',paddingRight:'8px',paddingTop:'5px'}}/>
          <p style={{fontWeight:'bold',paddingRight:'6px',paddingTop:'3px',color:'red',fontSize:'20px',display:'inline'}}>Time remaining</p>
          <p style={{fontWeight:'bold',color:'red',fontSize:'25px',marginTop:'-3px',display:'inline'}}>
            {calbetweenDate(data2.eventOne.end_date)}</p>
            <p style={{fontWeight:'bold',paddingLeft:'6px',paddingTop:'3px',color:'red',fontSize:'20px',display:'inline'}}>Day</p> 
          
      </div>
      <Row  style={{paddingTop:'20px',marginBottom:'-20px',width:'100%',marginTop:'-10%'}}>
        <Col  style={{height: '100px',marginRight:'-50%'}}>
          <FontAwesomeIcon size="2x" icon={faRunning}  style={{marginLeft:'15px'}}/>
          <p style={{fontSize:'13px'}}><b>{calrunner(data2.eventOne.member)}Runner</b></p> </Col>
        <Col  style={{marginRight:'-50%'}}>
          <FontAwesomeIcon size="2x" icon={faClock}  style={{marginLeft:'30px'}}/>
          <p style={{fontSize:'13px',marginLeft:'23px'}}><b>{calDate(data.eventOne.end_date, data.eventOne.start_date)} Day</b></p></Col>
        <Col>
          <FontAwesomeIcon size="2x" icon={faRoad}  style={{marginLeft:'45px'}}/>
          <p style={{fontSize:'13px',marginLeft:'40px'}}><b>{(calTotalDistance(data.activityhasevent) / 1000).toFixed(2)} km.</b></p></Col>
          <Col  style={{marginRight:'-50%'}}>
         
          </Col>
    
          
          

         
            
      </Row>
      
      {data2.eventOne.member.find(ele => Number(ele) === user.id) === undefined ?(
          <Button style={{float:'right',fontWeight:'bold'}}
            onClick={handleShow} 
            variant="primary" 
            disabled=
            {data2.eventOne.member.find(ele => Number(ele) === user.id) !== undefined && moment(data.eventOne.end_date).format('YYYY/MM/DD') < moment(new Date()).format('YYYY/MM/DD')}
          >Join Now</Button>
        ):(
          null
        )}

       <Tabs
       style={{fontWeight:'bold'}}
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
        <Tab eventKey="home" title="Overall">
          <BootstrapTable 
            keyField='_id' 
            data={ data.activityhasevent } 
            columns={ columns } 
            pagination={ paginationFactory(options) }
            rowStyle={ rowMyselfStyle }
            defaultSorted={ defaultSorted } 
          />
        </Tab>
        <Tab eventKey="myteam" title="My Team">
          <BootstrapTable 
            keyField='_id' 
            data={ data.MyteamLead } 
            columns={ columns } 
            pagination={ paginationFactory(options2) }
            rowStyle={ rowMyselfStyle }
            defaultSorted={ defaultSorted } 
          />
        </Tab>
        <Tab eventKey="team" title="Team Leader">

             <BootstrapTable 
             keyField='_id' 
             data={ data.groupleader } 
             columns={ columns2 } 
            pagination={ paginationFactory(options3) }
            //  rowStyle={ rowMyselfStyle }
            defaultSorted={ defaultSortedac }   
           />
         
        </Tab>
      </Tabs>
      



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการสมัคร</Modal.Title>
        </Modal.Header>
        <Modal.Body>ยืนยันการสมัคร</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleOK}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  )
}

export default EventDetail