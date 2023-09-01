import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRegistrationService } from 'services/useAuthService'
import { useNavigate } from 'react-router-dom'


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  account_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter the name of your company'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@l3vels.xyz'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    )
})

const initialValues = {
  name: '',
  email: '',
  password: '',
  account_name: ''
}

const useRegister = () => {
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' })
  const [registrationComplete] = useRegistrationService()
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    const data = { ...values }
    const response = await registrationComplete(data)

    if (!response) {
      setAlertMessage({ type: 'danger', message: 'User email is already registered' })
      return
    }

    // navigate('/login', { state: { message: response.message } })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  useEffect(() => {
    if (!formik.isSubmitting) return
    if (Object.keys(formik.errors).length > 0) {
      const error = document.getElementsByName(Object.keys(formik.errors)[0])[0]
      if (error) {
        error.focus()
      }
    }
  }, [formik])

 

  return {
    formik,
    alertMessage,
  }
}

export default useRegister
