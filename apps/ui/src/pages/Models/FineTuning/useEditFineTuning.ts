import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFineTuningByIdService } from 'services/fineTuning/useFineTuningByIdService'
import { useFineTuningsService } from 'services/fineTuning/useFIneTuningsService'
import { useUpdateFineTuningService } from 'services/fineTuning/useUpdateFineTuningService'
import { fineTuningValidationSchema } from 'utils/validationsSchema'

export const useEditFineTuning = () => {
  const { setToast } = useContext(ToastContext)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const { fineTuningId } = params

  const { data: fineTuningById } = useFineTuningByIdService({ id: fineTuningId || '' })
  const { refetch: refetchFineTining } = useFineTuningsService()

  const [updateFineTuning] = useUpdateFineTuningService()

  const defaultValues = {
    fine_tuning_name: fineTuningById?.name,
    fine_tuning_file_url: fineTuningById?.file_url,
    fine_tuning_model: fineTuningById?.model_id,
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
      const updatedValues = {
        name: values.fine_tuning_name,
        file_url: values.fine_tuning_file_url,
        model_id: values.fine_tuning_model,
      }

      await updateFineTuning(fineTuningId || '', updatedValues)
      await refetchFineTining()

      setToast({
        message: 'Fine-Tuning was Updated!',
        type: 'positive',
        open: true,
      })
      navigate('/models')
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
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: fineTuningValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
    handleErrorAlert,
  }
}
