import { useState } from 'react'
import { Container, Image } from 'semantic-ui-react'
import instaclone from '../../assets/png/instaclone.png'
import LoginForm from '../../components/Auth/LoginForm/LoginForm'
import RegisterForm from '../../components/Auth/RegisterForm'

import './Auth.scss'

export default function Auth() {

  const [showLogin, setShowLogin] = useState(true)

  return (
    <Container fluid className='auth'>
        <Image src={instaclone} alt="instaclone" />
        <div className='container-form'>
           {showLogin ? <LoginForm/> : <RegisterForm setShowLogin={setShowLogin} />}
        </div>

        <div className='change-form'>
          {showLogin ? (
            <>
              <p>¿No tienes cuenta aún?</p>
              <span onClick={() => (setShowLogin(!showLogin))}>Registrate</span>
            </>
          ) : (
            <>
              <p>Entra con tu cuenta!</p>
              <span onClick={() => (setShowLogin(!showLogin))}>Iniciar sesión</span>
            </>
          )}
        </div>
    </Container>
  )
}

