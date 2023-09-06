import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useActivateAccountService,
  useLoginService,
  useResendVerifyEmailService,
} from 'services/useAuthService'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { removeAccountId } from 'helpers/authHelper'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter Email address'),
  password: Yup.string().required('Please enter your password'),
  // .matches(
  //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  //   "Password must contain at least 8 characters, one uppercase, one number and one special case character.",
  // ),
})

const initialValues = {
  email: '',
  password: '',
}

const useLogin = () => {
  const [alertMessage, setAlertMessage] = React.useState({
    type: '',
    message: '',
  })
  const [showResendAlert, setShowResendAlert] = React.useState(false)
  const { authLoginComplete, loading: authLoginCompleteLoading } = useLoginService()
  const { activateAccount, loading: activateAccountLoading } = useActivateAccountService()
  const { resendVerifyEmail, loading: resendVerifyEmailLoading } = useResendVerifyEmailService()
  const { id }: any = useParams()
  const navigate = useNavigate()
  const { ...args }: any = useLocation()


  useEffect(() => {
    if (id) {
      activateAccount(id, (activate: any) => {
        if (!activate?.success) {
          return setAlertMessage({
            type: 'danger',
            message:
              'Something went wrong. If this error persists, please contact the administrator.',
          })
        }

        setAlertMessage({
          type: 'success',
          message: 'Your account has been verified. Login to your account to get started',
        })

        setTimeout(() => {
          navigate('/login')
        }, 1500)
      })
    }
    if (args?.location?.state?.message) {
      setAlertMessage({
        type: 'success',
        message: `${args?.location?.state?.message}`,
      })
      navigate('/login', { state: {} })
    }
    // console.log('args::', args)
  }, [args?.location?.state?.message]) // eslint-disable-line

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => {
      const response = await authLoginComplete(values.email, values.password)

      if (response.challengeName === 'NEW_PASSWORD_REQUIRED') {
        navigate('update-password', { state: { response } })
        return
      }
      const hasError = response.hasError
      const networkError = response?.error?.networkError
      if (hasError && networkError?.statusCode === 400) {
        return setAlertMessage({
          type: 'danger',
          message: networkError?.result?.detail || 'User email or password is incorrect',
        })
      }

      if (response.hasError && !networkError?.result) {
        return setAlertMessage({
          type: 'danger',
          message: networkError?.result?.detail || 
          'Something went wrong. If this error persists, please contact the administrator.',
        })
      }

      if (response.twoFactorToken) {
        return navigate(`/authentication/${response.twoFactorToken}`)
      }

      if (!response.verified) {
        setAlertMessage({
          type: '',
          message: '',
        })
        return setShowResendAlert(true)
      }

      if (response && response.success) {
        removeAccountId()
        setTimeout(() => {
          window.location.href = '/'
        }, 500)
      }
    },
  })

  const resendVerifyEmailHandle = async () => {
    const { success, message } = await resendVerifyEmail(formik.values.email)
    setAlertMessage({ type: success ? 'success' : 'danger', message })
    if (success) {
      setShowResendAlert(false)
    }
  }

  const handleCloseAlert = () => {
    setAlertMessage({
      type: '',
      message: '',
    })
  }

  return {
    formik,
    alertMessage,
    showResendAlert,
    resendVerifyEmailHandle,
    handleCloseAlert,
    authLoginCompleteLoading,
    activateAccountLoading,
    resendVerifyEmailLoading
  }
}

export default useLogin
