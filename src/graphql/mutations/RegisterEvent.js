import gql from 'graphql-tag'

export default gql`
mutation($eventid: Int, $userid: Int){
  registerEvent(eventid: $eventid, userid: $userid){
    member
  }
}
`
