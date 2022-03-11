import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../gql/user'
import './LoginForm.scss'
import { setToken, decodeToken } from '../../../utils/token'
import useAuth from '../../../hooks/useAuth'

export default function LoginForm() {
  
    const { setUser } = useAuth()

    const [error, setError] = useState("")
    const [login] = useMutation(LOGIN);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
          email: Yup.string().email('El email no es válido').required('El email es requerido'),
          password: Yup.string().required('La contraseña es requerida')
        }),
        onSubmit: async (formData) => {
            setError("")
          try {
            
            const { data } = await login({
              variables: {
                input: formData
              }
            })
            
            const { token } = data.login
            setToken(token)
            setUser(decodeToken(token))
    
          } catch (error) {
            setError(error.message)
          }
    
        }
      })  
    
  return (
    <>
        <Form className='login-form' onSubmit={formik.handleSubmit} autoComplete="off">
            <h2>Entra para ver foto y videos de tus amigos</h2>
            <Form.Input error={formik.errors.email && true} value={formik.values.email} onChange={formik.handleChange} type='email' placeholder='correo eletronico' name='email' />
            <Form.Input error={formik.errors.password && true} value={formik.values.password} onChange={formik.handleChange} type='password' placeholder='contraseña' name='password' />
            <Button type='submit' className='btn-submit'>Iniciar Session</Button>
            {error && <p className='submit-error'>{error}</p>}
       </Form>
    </>
  )
}

function initialValues() {
    return {
      email: '',
      password: '',
    }
  }
