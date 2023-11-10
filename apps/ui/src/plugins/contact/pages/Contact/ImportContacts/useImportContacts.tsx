import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'

import { agentValidationSchema } from 'utils/validationsSchema'

export const useImportContacts = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()

  const initialValues = {}

  const handleSubmit = (values: any) => {}

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema: agentValidationSchema,
    // enableReinitialize: true,
  })

  return {
    formik,
  }
}
