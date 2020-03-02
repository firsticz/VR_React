import gql from 'graphql-tag'

export default gql`
mutation ($id: Int, $password: String!, $username: String!) {
  setPassword(id: $id, password: $password, username: $username) {
    id
    username
    password
  }
}
`
