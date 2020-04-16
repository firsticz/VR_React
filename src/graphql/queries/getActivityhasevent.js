import gql from 'graphql-tag'

export default gql`
query($eventId: Float){
  activityhasevent(eventId: $eventId){
    _id
    event {
      _id
      eventId
      NameTH
      NameEN
      start_date
      end_date
    }
    activities{
      _id
      distance
      start_date
      name
    }
    profile{
      username
      firstname
      lastname
    }
    
  }
}
`
