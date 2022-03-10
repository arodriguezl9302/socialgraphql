import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../../../gql/user'
import "./RegisterForm.scss"

export default function RegisterForm(props) {

  const { setShowLogin } = props;

  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
      username: Yup.string().required('El nombre de usuario es requerido'),
      email: Yup.string().email('El email no es válido').required('El email es requerido'),
      password: Yup.string().required('La contraseña es requerida'),
      repeatPassword: Yup.string().required('La contraseña es requerida').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    }),
    onSubmit: async (formData) => {
      
      try {
        const newUser = formData;
        delete newUser.repeatPassword;
        
        await register({
          variables: {
            input: newUser
          }
        })

        toast.success("Usuario registrado correctamente")
        setShowLogin(true);

      } catch (error) {
        toast.error(error.message)
      }

    }
  })

  return (
    <>
       <h2 className="register-form-title">Regostrate para ver las fotos y video de tus amigos</h2> 
       <Form className='register-form' onSubmit={formik.handleSubmit} autoComplete="off">
        <Form.Input error={formik.errors.name && true} value={formik.values.name} onChange={formik.handleChange} type='text' placeholder='nombre y apellidos'  name='name' autoComplete="off"/>
        <Form.Input error={formik.errors.username && true} value={formik.values.username} onChange={formik.handleChange} type='text' placeholder='nombre de usuario' name='username' autoComplete="off"/>
        <Form.Input error={formik.errors.email && true} value={formik.values.email} onChange={formik.handleChange} type='email' placeholder='correo eletronico' name='email' />
        <Form.Input error={formik.errors.password && true} value={formik.values.password} onChange={formik.handleChange} type='password' placeholder='contraseña' name='password' />
        <Form.Input error={formik.errors.repeatPassword && true} value={formik.values.repeatPassword} onChange={formik.handleChange} type='password' placeholder='repetir contraseña' name='repeatPassword' />
        <Button type='submit' className='btn-submit'>Registrarse</Button>
       </Form>
    </>
  )
}

function initialValues() {
  return {
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  }
}
