import gql from 'graphql-tag'

export default gql`
mutation($id: Float,$groupId: String, $name: String){
  createGroup(record:{groupId: $groupId, name: $name}){
    recordId
  }
}
`