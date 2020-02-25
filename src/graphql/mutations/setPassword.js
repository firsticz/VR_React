import gql from 'graphql-tag'

export default gql`
mutation ($id: Int, $password: String!) {
  setPassword(id: $id, password: $password) {
    id
    username
    password
  }
}
`
