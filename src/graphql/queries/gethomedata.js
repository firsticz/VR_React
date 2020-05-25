import gql from 'graphql-tag'

export default gql`

query{
    expEvent{
      eventId
      NameTH
      NameEN
      start_date
      end_date
      banner
    }
  
    nowevent {
      eventId
      NameTH
      NameEN
      start_date
      end_date 
      banner
    }
    }
`