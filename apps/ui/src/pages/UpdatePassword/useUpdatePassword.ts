import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUpdatePasswordService } from 'services/useAuthService'
import * as Yup from 'yup'
import useSnackbarAlert from 'hooks/useSnackbar'

import { useTranslation } from 'react-i18next'

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

const useUpdatePassword = () => {
  const { t } = useTranslation()
  const { setSnackbar } = useSnackbarAlert()

  const navigate = useNavigate()
  const location = useLocation()

  const { response } = location?.state

  const [updatePassword] = useUpdatePasswordService()

  const onHandleSubmit = async (values: any) => {
    const responseBody = {
      challengeName: 'NEW_PASSWORD_REQUIRED',
      challengeSession: response?.challengeSession,
      challengeParameters: {
        USERNAME: response?.challengeParameters?.USER_ID_FOR_SRP,
        NEW_PASSWORD: values.password,
      },
    }
    try {
      const response = await updatePassword(responseBody)
      if (response && response.success) {
        setSnackbar({
          variant: 'success',
          // message: `Password successfully updated, \n Please login`,
          message: t('password-successfully-updated-please-login'),
        })
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    } catch (error) {
      return setSnackbar({
        variant: 'error',
        message: t('cannot-update-password'),
      })
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => onHandleSubmit(values),
  })

  return {
    formik,
  }
}

export default useUpdatePassword
