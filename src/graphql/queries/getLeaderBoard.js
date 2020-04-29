import gql from 'graphql-tag'

export default gql`
query{
  leaderboard{
    _id
    totaldistance
    firstname
    lastname
    profile
    sex
  }
}
`
