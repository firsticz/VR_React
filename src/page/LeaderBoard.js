import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-apollo'
import Container from 'react-bootstrap/Container'
import { Table, Spinner } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import getLeaderBoard from '../graphql/queries/getLeaderBoard'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import moment from 'moment'


const LeaderBoard = (props) => {
  const [ showLoading, setShowLoading ] = useState(true);
  const { user } = useContext(AuthContext)
  const { data = { leaderboard: []}, loading } = useQuery(getLeaderBoard)
  useEffect(()=>{
    setShowLoading(false);
  },[])
  const findindex = (cell, row) => {
    return (
    <p>{data.leaderboard.findIndex(name => name.firstname === cell) + 1}</p>
    )
  }
  const changdistance = (cell, row) => {
    return (
    <p>{Number(cell / 1000).toFixed(2)}</p>
    )
  }
  const changtime = (cell, row) => {
    return (
    <p>{moment.utc(Number(cell * 1000)).format('HH:mm:ss')}</p>
    )
  }

  const columns = [{
    dataField: 'firstname',
    text: '#',
    formatter: findindex,
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
    dataField: 'firstname',
    text: 'First Name',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    }
  }, {
    dataField: 'lastname',
    text: 'Last Price',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    }
  }, {
    dataField: 'totaldistance',
    text: 'distance (Km)',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    },
  formatter: changdistance
  }, {
    dataField: 'totaltime',
    text: 'Time',
    sort: true,
    headerStyle: {
      backgroundColor: 'rgb(255, 165, 0)'
    },
  formatter: changtime
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
      text: 'All', value: data.leaderboard.length
    }] 
  }

  const rowMyselfStyle = (row, rowIndex) => {
    row.index = rowIndex;
    const style = {};
    if (row.firstname === user.name) {
      style.backgroundColor = 'rgba(54, 163, 173, .10)'
    } else {
      style.backgroundColor = 'transparent'
    }
    style.borderTop = 'none'

    return style;
  }

 
  return (
      <Container>
        <div>
          {/* <Table>
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
              data.leaderboard.map((item, index)=>(
                <tr key={index} style={{}}>
                  <td>{index+1}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{Number(item.totaldistance / 1000).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
          </Table> */}
          {loading?(
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ):(
            <BootstrapTable 
              keyField='_id' 
              data={ data.leaderboard } 
              columns={ columns } 
              pagination={ paginationFactory(options) }
              rowStyle={ rowMyselfStyle }
            />
          )}

        </div>
      </Container>
  )
}
export default LeaderBoard