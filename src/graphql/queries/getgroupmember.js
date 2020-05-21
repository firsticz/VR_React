import gql from 'graphql-tag'

export default gql`
query{
    listgroup{
      _id
     profile {
       id
      firstname
      lastname
     }
    }
  }
`