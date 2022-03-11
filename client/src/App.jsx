import { useLayoutEffect, useMemo, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './config/apollo'
import { ToastContainer } from 'react-toastify'
import { getToken } from './utils/token'
import AuthContext from './context/AuthContext'

import Auth from './pages/Auth'
import Home from './pages/Home'

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useLayoutEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(token);
    } else {
      setIsLoggedIn(false);
    }
  }, [])

  const logout = () => {
    console.log('cerrar session')
  }

  const setUser = (user) => {
    setIsLoggedIn(user);
  }

  const authData = useMemo(
    () => ({
      isLoggedIn,
      setUser,
      logout
    }),
    [isLoggedIn]
  )
  
  return (
    <ApolloProvider client={client}>
        <AuthContext.Provider value={authData}>
          {!isLoggedIn ? <Auth/> : <Home/>}
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthContext.Provider>
    </ApolloProvider>
  )
}
