import gql from 'graphql-tag'

export default gql`
query($eventId : Float){
    eventOne(filter:{
      eventId: $eventId
    }){
      eventId
      NameTH
      NameEN
      banner
      start_date
      end_date
    }
  }
`