import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateFineTuningService } from 'services/fineTuning/useCreateFineTuningService'
import { useFineTuningsService } from 'services/fineTuning/useFIneTuningsService'

export const useCreateFineTuning = () => {
  const navigate = useNavigate()

  const { closeModal } = useModal()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [createFineTuningService] = useCreateFineTuningService()
  const { refetch: refetchFineTining } = useFineTuningsService()

  const initialValues = {
    fine_tuning_name: '',
    fine_tuning_file_url: '',
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    try {
      const fineTuningInput = {
        name: values.fine_tuning_name,
        file_url: values.fine_tuning_file_url,
      }

      await createFineTuningService(fineTuningInput)
      await refetchFineTining()
      navigate('/models')
      setToast({
        message: 'Fine-tuning was Created!',
        type: 'positive',
        open: true,
      })
    } catch (e) {
      setToast({
        message: 'Failed to create Fine-tuning!',
        type: 'negative',
        open: true,
      })
    }

    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema: agentValidationSchema,
    // enableReinitialize: true,
  })

  return { isLoading, formik }
}
