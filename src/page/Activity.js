import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Spinner } from 'react-bootstrap'
import getMyActivity from '../graphql/queries/getMyActivity'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRunning } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../context/AuthContext'

const Activity = (props) => {
  const [ showLoading, setShowLoading ] = useState(true);
  const { user } = useContext(AuthContext)
  const { data = { getActivity: []}, loading } = useQuery(getMyActivity, {
    variables:{
      id: Number(user.id)
    }
  })
  const colorlist = [
    'rgb(33, 150, 243)',
    'rgb(241, 15, 87)'
  ]
  const handleColor = (distance) => {
    if(distance > 1 ){
      return colorlist[1]
    } else {
      return colorlist[0]
    }
  }
  useEffect(()=>{
    setShowLoading(false);
  },[])
  return(
    <Container>
      {/* <div>
        {loading?(
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ):(
          <Table>
            <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>distance (Km)</th>
            </tr>
            </thead>
            <tbody>
              {data.activityMany.map((item,index)=>(
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.start_date}</td>
                  <td></td>
                  <td>{Number(item.distance / 1000 ).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div> */}
      <div >
      <VerticalTimeline>
        {
          loading?(
            <Spinner animation="border" role="status" >
              <span className="sr-only" >Loading...</span>
            </Spinner>
          ):(
            data.getActivity.map((item, index)=>(
              <VerticalTimelineElement 
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{ background: handleColor(Number(item.distance / 1000 )), color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid var(handleColor(Number(item.distance / 1000 )))' }}
                date={moment(item.start_date).format('MM/DD/YYYY, h:mm:ss a')}
                iconiconStyle={{ background: handleColor(Number(item.distance / 1000 )), color: '#fff' }}
                icon={<FontAwesomeIcon icon={faRunning} />}
              >
                <h3 className="vertical-timeline-element-title">{item.name}</h3>
                {/* <h4 className="vertical-timeline-element-subtitle">test</h4> */}
                <p>
                  distance : {Number(item.distance / 1000 ).toFixed(2)} km.
                </p>
              </VerticalTimelineElement>
            ))
            
          )
        }
      </VerticalTimeline>
      </div>
    </Container>
  )
}

export default Activity