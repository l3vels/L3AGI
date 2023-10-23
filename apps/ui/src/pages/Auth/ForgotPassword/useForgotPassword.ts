import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' })
  const [forgotPassword] = useForgotPasswordService()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => {
      const response = await forgotPassword(values.email, () => {})

      if (!response) {
        setAlertMessage({ type: 'danger', message: 'Incorrect email' })
        return
      }

      setAlertMessage({
        type: 'success',
        message: t('forget-password-message'),
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
