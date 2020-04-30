import gql from 'graphql-tag'

export default gql`
query($eventId: Float, $userId: Float){
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
      moving_time
      average_speed
    }
    profile{
      username
      firstname
      lastname
      group
    }
    
  }
  
  eventOne(filter:{eventId: $eventId}){
    id
    member
    start_date
    end_date
  }
  groupleader(eventId: $eventId){
    activity {
      id
      distance
      
    }
    user {
      id
      username
      firstname
      lastname
    }
    groupDetail {
      groupId
      name
    }
    
  }

  MyteamLead(eventId: $eventId, userId: $userId){
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
      moving_time
      average_speed
    }
    profile{
      username
      firstname
      lastname
      group
    }
    
  }
}
`
