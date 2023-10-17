import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useForgotPasswordService } from 'services/useAuthService'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter Email address.'),
})

const initialValues = {
  email: '',
}

const useForgotPassword = () => {
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' })
  const [forgotPassword] = useForgotPasswordService()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const response = await forgotPassword(values.email, () => {})

      if (!response) {
        setAlertMessage({ type: 'danger', message: 'Incorrect email' })
        return
      }

      setAlertMessage({
        type: 'success',
        message: 'Reset password email has been sent successfully.',
      })
    },
  })

  const handleCloseAlert = () => {
    setAlertMessage({
      type: '',
      message: '',
    })
  }

  return {
    formik,
    alertMessage,
    handleCloseAlert,
  }
}

export default useForgotPassword
