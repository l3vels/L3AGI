import React from 'react'
import { useFormik } from 'formik'
// import * as Yup from "yup"
import { useLoginCompleteService, useResendCodeService } from 'services'
import { useParams } from 'react-router-dom'

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .email("Invalid email")
//     .required("Please enter Email address."),
// })

const initialValues = {
  code: '',
}

const useTwoFA = () => {
  const { id }: any = useParams()
  const [loginComplete] = useLoginCompleteService()
  const [resendCode] = useResendCodeService()
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' })

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema,
    onSubmit: async values => {
      const response = await loginComplete(values.code, id)

      if (!response.success) {
        setAlertMessage({ type: 'danger', message: 'OTP code incorrect, please try again' })
        return
      }

      if (response && response.success) {
        setTimeout(() => {
          window.location.href = '/'
        }, 500)
      }
    },
  })

  const handleResendCode = async () => {
    const response = await resendCode(id)

    if (response.success) {
      return setAlertMessage({
        type: 'success',
        message: 'One time code has been sent successfully',
      })
    }
  }

  return {
    formik,
    handleResendCode,
    alertMessage,
  }
}

export default useTwoFA
