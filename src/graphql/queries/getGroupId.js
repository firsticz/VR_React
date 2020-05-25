import gql from 'graphql-tag'

export default gql`
query{
    groupOne(sort:_ID_DESC){
      groupId
    }
  }
`