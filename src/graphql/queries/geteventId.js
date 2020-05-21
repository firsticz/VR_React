import gql from 'graphql-tag'

export default gql`
query{
    eventOne(sort:_ID_DESC){
      eventId
    }
  }
`