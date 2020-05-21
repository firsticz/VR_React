import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from 'react-apollo'
import { Spinner, Tabs, Button, Modal, Row, Col, Tab } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import _ from 'lodash'
import getlistmember from '../graphql/queries/getgroupmember'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

const GroupDetail = (props) => {
    const { history } = props
    const { groupid } = props.match.params
    const { data = { listgroup: []}, loading } = useQuery(getlistmember)
    const [ list , setList ] = useState([])
    const [ status , setStatus ] = useState(true)

    if(!loading && status){
        setList(_.find(data.listgroup, {'_id': groupid}))
        setStatus(false)
    }
    if(loading){
        return (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )
    }

    const columns = [{
        dataField: 'firstname',
        text: 'First name',
        headerStyle: {
          backgroundColor: 'rgb(255, 165, 0)'
        },
      }, {
        dataField: 'lastname',
        text: 'Last Name',
        headerStyle: {
          backgroundColor: 'rgb(255, 165, 0)'
        }
      }

    ]
    


    return (
        <Container>
            {console.log(list)}
            <BootstrapTable 
             keyField='_id' 
             data={ list.profile } 
             columns={ columns } 
            // pagination={ paginationFactory(options3) }
            // //  rowStyle={ rowMyselfStyle }
            // defaultSorted={ defaultSortedac }   
           />
        </Container>
    )

}

export default GroupDetail