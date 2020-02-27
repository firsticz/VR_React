import gql from 'graphql-tag'

export default gql`
mutation ($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
`