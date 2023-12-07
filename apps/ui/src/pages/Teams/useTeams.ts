import { AuthContext, ToastContext } from 'contexts'
import { useFormik } from 'formik'
// import useSnackbarAlert from 'hooks/useSnackbar'
import { useContext } from 'react'
import {
  useInviteUserService,
  useAssignedUserListService,
  useDeleteAccountAccessService,
  useUserAccountService,
} from 'services'

import { useTranslation } from 'react-i18next'
import { useModal } from 'hooks'

const useAdministration = () => {
  const { setToast } = useContext(ToastContext)
  const { t } = useTranslation()
  // const { setSnackbar } = useSnackbarAlert()
  const { inviteUser } = useInviteUserService()
  const { data: assignedUserList, refetch } = useAssignedUserListService()
  const { deleteAccountAccess } = useDeleteAccountAccessService()
  const { account: currentAccount } = useContext(AuthContext)
  const { data: userAccount } = useUserAccountService()

  const { openModal, closeModal } = useModal()

  const openCreateTeamsModal = () => {
    openModal({
      name: 'create-team-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    const res = await inviteUser(values.shared_email)

    if (!res) {
      setToast({
        message: 'failed to add member',
        type: 'negative',
        open: true,
      })

      closeModal('create-team-modal')
      return
    }

    if (res) {
      setToast({
        message: `Member with ${values.shared_email} is added`,
        type: 'positive',
        open: true,
      })
      closeModal('create-team-modal')
      refetch()
      return
    }

    refetch()
    closeModal('create-team-modal')
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: { shared_email: '' },
    // validationSchema: administrationValidation,
    onSubmit: values => handleSubmit(values),
  })

  const disabled = !!(userAccount.id === currentAccount.id)

  const handleDeleteAccountAccess = async (id: any) => {
    if (!disabled) return
    const res = await deleteAccountAccess(id)
    if (!res || !res.success) {
      return setToast({
        message: 'failed to delete member',
        type: 'negative',
        open: true,
      })
    }
    setToast({
      message: t('Member was deleted'),
      type: 'positive',
      open: true,
    })
    refetch()
    closeModal('create-team-modal')
  }

  // const config = columnConfig({ handleDeleteAccountAccess, disabled })

  return {
    formik,
    assignedUserList,
    disabled,
    openCreateTeamsModal,
    closeModal,
    handleDeleteAccountAccess,
    refetch,
  }
}

export default useAdministration

// // import { AuthContext } from 'contexts'
// import { useFormik } from 'formik'
// import { AuthContext, ToastContext } from 'contexts'
// import useSnackbarAlert from 'hooks/useSnackbar'
// import { useContext } from 'react'
// import {
//   useInviteUserService,
//   useAssignedUserListService,
//   useDeleteAccountAccessService,
//   useUserAccountService,
// } from 'services'
// import { administrationValidation } from 'utils/validationsSchema'
// // import columnConfig from './columnConfig'

// import { useTranslation } from 'react-i18next'
// import { useForm } from 'react-hook-form'
// import { useModal } from 'hooks'

// const initialValues = {
//   email: '',
//   role: '',
// }

// const useAdministration = () => {
//   const { t } = useTranslation()
//   const { setSnackbar } = useSnackbarAlert()
//   const { inviteUser } = useInviteUserService()
//   const { data: assignedUserList, refetch } = useAssignedUserListService()
//   const { deleteAccountAccess } = useDeleteAccountAccessService()
//   const { account: currentAccount } = useContext(AuthContext)
//   const { data: userAccount } = useUserAccountService()

//   console.log('userAccount', userAccount)

//   const { openModal, closeModal } = useModal()

//   const { setToast } = useContext(ToastContext)

//   const openCreateTeamsModal = () => {
//     openModal({
//       name: 'create-team-modal',
//     })
//   }

//   const handleSubmit = async (values: any) => {
//     const res = await inviteUser(values.shared_email)
//     // const res = await inviteUser(newValues, () => {})

//     if (!res) {
//       setToast({
//         message: 'failed-to-add-team',
//         type: 'negative',
//         open: true,
//       })

//       closeModal('create-team-modal')
//       return
//     }

//     if (res) {
//       setToast({
//         message: t('new-team-was-created'),
//         type: 'positive',
//         open: true,
//       })
//       closeModal('create-team-modal')
//       refetch()
//       return
//     }
//     setSnackbar({
//       message: `${t('success')}`,
//       variant: 'success',
//     })

//     // formik.resetForm()
//   }

//   const formik = useFormik({
//     initialValues: { shared_email: '' },
//     validationSchema: administrationValidation,
//     onSubmit: values => handleSubmit(values),
//   })

// const disabled = !!(userAccount.id === currentAccount.id)

// const handleDeleteAccountAccess = async (item: any) => {
//   if (!disabled) return
//   const res = await deleteAccountAccess(item.id)
//   if (!res || !res.success) {
//     return setSnackbar({
//       message: res.message,
//       variant: 'warning',
//     })
//   }
//   setSnackbar({
//     message: `${t('success')}`,
//     variant: 'success',
//   })
//   refetch()
// }

//   // const config = columnConfig()
//   const formHook = useForm({
//     defaultValues: initialValues,
//   })
//   console.log(assignedUserList)

//   return { formik, assignedUserList, formHook, openCreateTeamsModal, closeModal }
// }

// export default useAdministration
