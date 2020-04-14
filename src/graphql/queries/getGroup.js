import gql from 'graphql-tag'

export default gql`
query{
  groupMany{
    _id
    groupId
    name
  }
}
`
