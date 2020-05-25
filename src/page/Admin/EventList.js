import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Table, Spinner } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import moment from 'moment'

import getEvent from '../../graphql/queries/getEvent'

const EventList =() => {
    const { data = { eventMany: []}, loading } = useQuery(getEvent) 

    const editevent = (cell, row) => {
        return (
        <Link to={`/admin/updateevent/${cell}`}>
            {cell}
        </Link>
        )
      }


    const columns = [{
        dataField: 'eventId',
        text: 'eventId',
        headerStyle: {
          backgroundColor: 'rgb(255, 165, 0)'
        },
        formatter: editevent
      }, {
        dataField: 'NameTH',
        text: 'Name TH',
        sort: true,
        headerStyle: {
          backgroundColor: 'rgb(255, 165, 0)'
        }
      }, {
        dataField: 'NameEN',
        text: 'Name EN',
        sort: true,
        headerStyle: {
          backgroundColor: 'rgb(255, 165, 0)'
        }
      }]

      const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing { from } to { to } of { size } Results
        </span>
      );

      const options = {
        paginationSize: 4,
        pageStartIndex: 1,
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
          text: 'All', value: data.eventMany.length
        }] 
      }


    return (
        <Container style={{marginTop:'70px'}}>
        <div>
          {loading?(
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ):(
            <BootstrapTable 
           
              keyField='_id' 
              data={ data.eventMany } 
              columns={ columns } 
              pagination={ paginationFactory(options) }
            //   rowStyle={ rowMyselfStyle }
            />
          )}

        </div>
      </Container>
    )
}

export default EventList