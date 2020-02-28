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


