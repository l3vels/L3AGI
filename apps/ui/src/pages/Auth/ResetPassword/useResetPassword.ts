import React from 'react'
import { useFormik } from 'formik'
import { useParams, useNavigate } from 'react-router-dom'
import { useRestPasswordService } from 'services/useAuthService'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password.')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    ),
  confirm_password: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
})

const initialValues = {
  password: '',
  confirm_password: '',
}

const useResetPassword = () => {
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' })
  const navigate = useNavigate()
  const { id }: any = useParams()
  const [resetPassword] = useRestPasswordService()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => {
      const response = await resetPassword(values.password, values.confirm_password, id, () => {})

      if (response.hasError && response?.error?.networkError?.result?.statusCode === 400) {
        return setAlertMessage({ type: 'danger', message: 'Incorrect confirm password' })
      }

      if (response && response.success) {
        setAlertMessage({ type: 'success', message: 'Password successfully updated' })
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    },
  })

  return {
    formik,
    alertMessage,
  }
}

export default useResetPassword
