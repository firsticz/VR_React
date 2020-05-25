import gql from 'graphql-tag'

export default gql`
query($groupId : Float){
    groupOne(filter:{
      groupId: $groupId
    }){
      groupId
      NameTH
      NameEN
      banner
      
    }
  }
`