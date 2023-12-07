import { useFormik } from 'formik'
import { useChangePasswordService } from 'services'
import * as Yup from 'yup'
// import useSnackbarAlert from 'hooks/useSnackbar'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { ToastContext } from 'contexts'

const validationSchema = Yup.object().shape({
  current_password: Yup.string().required('Please enter your current password.'),
  new_password: Yup.string()
    .required('Please enter your new password.')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], "Passwords don't match.")
    .required('Please confirm your password.'),
})

const initialValues = {
  current_password: '',
  new_password: '',
  confirm_password: '',
}

const useChangePassword = () => {
  const { t } = useTranslation()
  const [changePassword] = useChangePasswordService()
  // const { setSnackbar } = useSnackbarAlert()
  const { openModal, closeModal } = useModal()
  const { setToast } = useContext(ToastContext)

  const openCreateChangePasswordModal = () => {
    openModal({
      name: 'create-change-password-modal',
    })
  }

  const onHandleUpdatePassword = async ({
    current_password,
    new_password,
  }: // confirm_password,
  any) => {
    try {
      const result = await changePassword({ current_password, new_password })
      if (result.success) {
        setToast({
          message: t('Password successfully updated.'),
          type: 'positive',
          open: true,
        })
        closeModal('create-change-password-modal') // Close the modal
      } else {
        setToast({
          type: 'negative',
          message: t('Failed to update password.'),
          open: true,
        })
      }
    } catch (error) {
      setToast({
        type: 'negative',
        message: t('An error occurred while updating the password.'),
        open: true,
      })
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onHandleUpdatePassword,
  })

  return {
    formik,
    openCreateChangePasswordModal,
    closeModal,
  }
}

export default useChangePassword
