import gql from 'graphql-tag'

export default gql`
query{
  eventMany{
    eventId
    NameTH
    NameEN
    start_date
    end_date
    member
  }
}
`
