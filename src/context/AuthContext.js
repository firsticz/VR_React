import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext()

export const checkTokenExpired = (token) => {
  if (token) {
    localStorage.setItem('token', token)
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp > Math.round(new Date().getTime() / 1000)) {
        return { user: decoded, token }
      }
      localStorage.removeItem('token')
      return { user: null, token: null }
    } catch (err) {
      localStorage.removeItem('token')
      return { user: null, token: null }
    }
  } else {
    localStorage.removeItem('token')
    return { user: null, token: null }
  }
}

const useToken = () => {
  const [session, setSession] = useState(() => checkTokenExpired(localStorage.getItem('token')))
  const setToken = t => setSession(checkTokenExpired(t))
  const checkToken = () => checkTokenExpired(localStorage.getItem('token'))
  const removeToken = () => setSession(checkTokenExpired(null))
  const { user, token } = session
  return {
    user, token, setToken, checkToken, removeToken,
  }
}

export const AuthProvider = (props) => {
  const { children } = props
  const {
    user, token, setToken, checkToken, removeToken,
  } = useToken()
  return (
    <AuthContext.Provider value={{
      user, token, setToken, checkToken, removeToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node,
}
AuthProvider.defaultProps = {
  children: null,
}

export const AuthConsumer = AuthContext.Consumer

export default AuthContext
