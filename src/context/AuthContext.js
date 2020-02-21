import React, { createContext, useState, useEffect } from 'react'

import app from '../firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // app.auth().onAuthStateChanged(setCurrentUser)
    app.isInitialized().then((val) => {
      setCurrentUser(val)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
