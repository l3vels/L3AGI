import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRegistrationService } from 'services/useAuthService'
import { useNavigate } from 'react-router-dom'

import {
  // ORGANISATION_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COMPANY_ROLE_OPTIONS,
} from 'utils/constants'
import countries from 'utils/countries'

// const companyOptionsValues = ORGANISATION_OPTIONS.map(item => item.value)
const companySizes = COMPANY_SIZE_OPTIONS.map(item => item.value)
const companyRoles = COMPANY_ROLE_OPTIONS.map(item => item.value)

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),
  company_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter the name of your company'),
  contact: Yup.string()
    .required('Please enter your contact number')
    .min(10, 'Too Short!')
    .max(15, 'Too Long!'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@l3vels.xyz'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    ),
  confirm_password: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
  company_size: Yup.string()
    .required('Please select the size of your fleet')
    .oneOf(companySizes, 'invalid value'),
  company_role: Yup.string()
    .required('Please select your role in the company')
    .oneOf(companyRoles, 'invalid value'),
  location: Yup.string().required('Please select your location'),
})

const initialValues = {
  first_name: '',
  last_name: '',
  contact: '',
  email: '',
  password: '',
  confirm_password: '',
  company_name: '',
  company_role: '',
  company_size: '',
  location: '',
  industry_update: '',
}

const useRegister = () => {
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' })
  const [registrationComplete] = useRegistrationService()
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    const data = { ...values }
    if (data.industry_update && data.industry_update.length > 0) {
      data.industry_update = true
    } else {
      data.industry_update = false
    }
    const response = await registrationComplete(values)

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

  const countryList = countries().map(({ name }) => ({ label: name, value: name }))

  return {
    formik,
    alertMessage,
    countries: countryList,
  }
}

export default useRegister
