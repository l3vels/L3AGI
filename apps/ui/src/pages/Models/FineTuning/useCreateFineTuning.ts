import { ToastContext } from 'contexts'
import { useFormik } from 'formik'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateFineTuningService } from 'services/fineTuning/useCreateFineTuningService'
import { useFineTuningsService } from 'services/fineTuning/useFIneTuningsService'
import { fineTuningValidationSchema } from 'utils/validationsSchema'

export const useCreateFineTuning = () => {
  const navigate = useNavigate()

  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [createFineTuningService] = useCreateFineTuningService()
  const { refetch: refetchFineTining } = useFineTuningsService()

  const initialValues = {
    fine_tuning_name: '',
    fine_tuning_file_url: '',
    fine_tuning_model: '',
  }

  const handleErrorAlert = (errorMessage: string) => {
    setToast({
      message: errorMessage,
      type: 'negative',
      open: true,
    })
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    try {
      const fineTuningInput = {
        name: values.fine_tuning_name,
        file_url: values.fine_tuning_file_url,
        model_id: values.fine_tuning_model,
      }

      await createFineTuningService(fineTuningInput)

      await refetchFineTining()
      navigate('/models')
      setToast({
        message: 'Fine-tuning was Created!',
        type: 'positive',
        open: true,
      })
    } catch (error: any) {
      if (error.networkError && 'result' in error.networkError) {
        handleErrorAlert(error.networkError.result.detail)
      } else {
        handleErrorAlert('Failed to create Fine-tuning!')
      }
    }

    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    validationSchema: fineTuningValidationSchema,
    // enableReinitialize: true,
  })

  return { isLoading, formik, handleErrorAlert }
}
