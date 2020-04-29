import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from 'react-apollo'
import { Spinner, Tabs, Button, Modal, Row, Col, Tab } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
// import moment from 'moment'
import AuthContext from '../context/AuthContext'
import getactivityhasevent from '../graphql/queries/getActivityhasevent'
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
  const { data = { activityhasevent: [], eventOne: {}}, loading } = useQuery(getactivityhasevent,{
    variables: {
      eventId: Number(eventId)
    }
  })
  const [ registerEvent ] = useMutation(RegisterEvent)
  const [show, setShow] = useState(false)
  const [key, setKey] = useState('home')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleOK = async () => {
    try{
      await registerEvent({
        variables: {
          eventid: Number(eventId),
          userid: user.id
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
    <p>{Number(_.sumBy(cell,'distance') / 1000).toFixed(2)}</p>
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
    text: 'Last Price',
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
  }]

  const customTotal = (from, to, size) => (
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
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: data.activityhasevent.length
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
  
  return (
    <Container>
        {data.activityhasevent.find(ele => Number(ele._id) === user.id) === undefined ?(
          <Button 
            onClick={handleShow} 
            variant="primary" 
            // disabled={data.activityhasevent.find(ele => Number(ele._id) === user.id) !== undefined}
          >Join Now</Button>
        ):(
          null
        )}
       
      <div style={{padding:'20px',float:'right'}}>
      <FontAwesomeIcon size="1x" icon={faCircle} color="green" />&nbsp;&nbsp;&nbsp;
        <b><p style={{display:'inline'}}>start: {moment(data.eventOne.start_date).format('YYYY/MM/DD')}</p></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon size="1x" icon={faCircle} color="red" />&nbsp;&nbsp;&nbsp;
        <b><p style={{display:'inline'}}>end: {moment(data.eventOne.end_date).format('YYYY/MM/DD')}</p></b>
      </div>
      <Row style={{paddingTop:'20px',marginBottom:'-20px'}}>
        <Col style={{height: '100px',marginRight:'-55%'}}>
          <FontAwesomeIcon size="2x" icon={faRunning}  style={{marginLeft:'15px'}}/>
          <p style={{fontSize:'13px'}}><b>{data.activityhasevent.length}Runner</b></p> </Col>
        <Col  style={{marginRight:'-55%'}}>
          <FontAwesomeIcon size="2x" icon={faClock}  style={{marginLeft:'11px'}}/>
          <p style={{fontSize:'13px'}}><b>{calDate(data.eventOne.end_date, data.eventOne.start_date)} Day</b></p></Col>
        <Col>
          <FontAwesomeIcon size="2x" icon={faRoad}  style={{marginLeft:'8px'}}/>
          <p style={{fontSize:'13px'}}><b>{(calTotalDistance(data.activityhasevent) / 1000).toFixed(2)} km.</b></p></Col>
      </Row>
      {/*
      <Table>
        <thead>
          <tr  style={{backgroundColor:'#FFA500',color:'#222'}}>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>distance (Km)</th>
          </tr>
        </thead>
        <tbody style={{padding:'1'}}>
            {loading?(
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ):(
            data.activityhasevent.map((item, index)=>(
            <>
            <tr key={index} style={{}}>
              <td>{item._id}</td>
              <td>{item.profile[0].firstname}</td>
              <td>{item.profile[0].lastname}</td>
              <td>{Number(_.sumBy(item.activities,'distance') / 1000).toFixed(2)}</td>
            </tr>
            </>
            ))
          )}
        </tbody>
      </Table> */}
       <Tabs
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
        <Tab eventKey="profile" title="My Team">
          <p>test</p>
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
  )
}

export default EventDetail