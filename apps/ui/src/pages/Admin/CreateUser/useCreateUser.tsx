import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

import { useCreateUserService } from 'services'
import { useNavigate } from 'react-router-dom'
import useSnackbarAlert from 'hooks/useSnackbar'

import countries from 'utils/countries'
import { createUserValidation, createAdminValidation } from 'utils/validationsSchema'

import { useTranslation } from 'react-i18next'

const userValues = {
  first_name: '',
  last_name: '',
  company_name: '',
  company_role: '',
  company_size: '',
  location: '',
  contact_number: '',
  email: ' ',
  role: 'user',
}

const adminValues = {
  first_name: '',
  last_name: '',
  location: '',
  contact_number: '',
  email: '',
  role: '',
}

const useCreateUser = () => {
  const { t } = useTranslation()
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' })
  const { createUser, loading } = useCreateUserService()
  const [validationSchema, setValidationSchema] = useState<any>(createUserValidation)
  const [initialValues, setInitialValues] = useState<any>(userValues)

  const { setSnackbar } = useSnackbarAlert()
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    const response = await createUser(values)

    if (response.hasError) {
      setAlertMessage({
        type: 'danger',
        message: t('user-email-is-already-registered'),
      })
      setSnackbar({
        message: t('user-email-is-already-registered'),
        variant: 'error',
      })
      return
    }

    setSnackbar({ message: t('user-created'), variant: 'success' })
    navigate(`/admin/user/${response.user?.id}`)
  }

  const handleCloseAlert = () => {
    setAlertMessage({
      type: '',
      message: '',
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  const countryList = countries().map(({ name }) => ({
    label: name,
    value: name,
  }))

  useEffect(() => {
    setInitialValues(adminValues)
    setValidationSchema(createAdminValidation)
  }, [formik.values.role === 'admin']) //eslint-disable-line

  useEffect(() => {
    setInitialValues(adminValues)
    setValidationSchema(createAdminValidation)
  }, [formik.values.role === 'user']) //eslint-disable-line

  return {
    formik,
    alertMessage,
    countries: countryList,
    loading,
    handleCloseAlert,
  }
}

export default useCreateUser
