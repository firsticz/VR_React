import gql from 'graphql-tag'

export default gql`
mutation($groupId: String, $name: String){
  updateGroup(record:{groupId: $groupId, name: $name}){
    recordId
  }
}
`