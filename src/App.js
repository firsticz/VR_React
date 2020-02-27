// import React, { useState, useEffect } from 'react';
// import './App.css';
// import queryString from 'query-string'
// import { Redirect } from 'react-router-dom'
// import axios from 'axios'

// const App = props => {
//   const [showLoading, setShowLoading] = useState(true);
//   const [regis, setRegis] = useState(false);

//   useEffect(()=>{
//     setShowLoading(false);
//     const query = queryString.parse(window.location.search);
//     if (query.token) {
//       window.sessionStorage.setItem("jwt", query.token);
//       window.sessionStorage.setItem("id", query.userid);
//       const result = axios.get('http://localhost:4500/users/checkregis/'+query.userid);
//       setRegis(result)
//       setShowLoading(false);
//     }
//   },[])

//     if(window.sessionStorage.getItem("jwt")){
//       console.log(regis)
//       if(regis){
//         return <Redirect to='/group' />
//       }
//       else{
//         return(
//           <div><p>no pass</p></div>
//         )
//       }
      
//     }
//     else{
//       return (
//           <div className="App">
//             <a href="http://localhost:4500/auth/strava" class="button">
//               <img alt="connect" src="/images/stravaconnect.png"/>
//             </a>
//           </div>
//       );
//     }
// }

// export default App;
import React, { useContext } from 'react'

import PrivatePage from './page/PrivatePage'
import LoginPage from './page/Login'
import AuthContext from './context/AuthContext'

const App = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  if (user) {
    return (<PrivatePage />)
  }
  return (<LoginPage />)
}

export default App


