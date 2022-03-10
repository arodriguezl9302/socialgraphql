import { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './config/apollo'
import { ToastContainer } from 'react-toastify'

import Auth from './pages/Auth'

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  
  return (
    <ApolloProvider client={client}>
        {!isLoggedIn ? <Auth/> : <h1>Hola</h1>}
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
    </ApolloProvider>
  )
}
