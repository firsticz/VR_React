import gql from 'graphql-tag'

export default gql`
query($userId: [Float]){
  eventMany(filter:{member:$userId}){
    eventId
    NameTH
    NameEN
    start_date
    end_date
    member
    banner
  }
}
`
