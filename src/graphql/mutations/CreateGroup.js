import gql from 'graphql-tag'

export default gql`
mutation($groupId: String, $name: String, $banner: String){
  createGroup(record:{groupId: $groupId, name: $name, banner: $banner}){
    recordId
  }
}
`