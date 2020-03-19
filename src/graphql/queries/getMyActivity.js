import gql from 'graphql-tag'

export default gql`
query($id: Int){
  getActivity(userid: $id){
    id
    name
    distance
    start_date
    elev_high
  }
}
`
