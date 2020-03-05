import gql from 'graphql-tag'

export default gql`
query($id: Float){
  activityMany(filter:{
    athlete:{
      id: $id
    }
  }){
    id
    name
    distance
    start_date
    elev_high
  }
}
`
