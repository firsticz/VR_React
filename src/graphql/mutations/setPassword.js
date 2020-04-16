import gql from 'graphql-tag'

export default gql`
mutation ($id: Int, $password: String!, $username: String!, $token: String!, $groupid: String!) {
  setPassword(id: $id, password: $password, username: $username, token: $token, groupid:$groupid) {
    id
    username
    password
  }
}
`
