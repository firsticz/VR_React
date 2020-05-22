import gql from 'graphql-tag'

export default gql`
mutation ($id: Float, $nameTH: String,$nameEN: String, $start_date: Date, $end_date: Date, $banner: String) {
  createEvent(record:{eventId: $id,NameTH: $nameTH,NameEN: $nameEN start_date: $start_date, end_date: $end_date, banner: $banner}){
    recordId
  }
}
`