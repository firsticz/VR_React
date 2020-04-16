import gql from 'graphql-tag'

export default gql`
mutation($groupId: String, $name: String){
  createGroup(record:{groupId: $groupId, name: $name}){
    recordId
  }
}
`