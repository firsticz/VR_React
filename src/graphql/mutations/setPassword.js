import gql from 'graphql-tag'

export default gql`
mutation ($id: Int, $password: String!, $username: String!, $token: String!) {
  setPassword(id: $id, password: $password, username: $username, token: $token) {
    id
    username
    password
  }
}
`
