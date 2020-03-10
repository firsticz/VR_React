import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Spinner } from 'react-bootstrap'
import getMyActivity from '../graphql/queries/getMyActivity'
import moment from 'moment'

const Activity = (props) => {
  const [ showLoading, setShowLoading ] = useState(true);
  const { data = { activityMany: []}, loading } = useQuery(getMyActivity)
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
      <div>
      <VerticalTimeline>
        {
          loading?(
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ):(
            data.activityMany.map((item, index)=>(
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date={moment(item.start_date).format('MM/DD/YYYY, h:mm:ss a')}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              >
                <h3 className="vertical-timeline-element-title">{item.name}</h3>
                <h4 className="vertical-timeline-element-subtitle">test</h4>
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