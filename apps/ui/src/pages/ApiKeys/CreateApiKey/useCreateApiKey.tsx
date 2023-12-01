import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApiKeysService } from 'services/apiKey/useApiKeysService'
import { useCreateApiKeyService } from 'services/apiKey/useCreateApiKeyService'
import { apiKeyValidation } from 'utils/validationsSchema' // Import the appropriate validation schema

export const useCreateApiKey = () => {
  const { setToast } = useContext(ToastContext)
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { refetch: refetchApiKeys } = useApiKeysService()
  const [createApiKeyService] = useCreateApiKeyService()
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    name: '',
    description: '',
  }

  const handleSubmit = async (values: { name: string; description: string }) => {
    setIsLoading(true)
    try {
      const apiKeyInput = {
        name: values.name,
        description: values.description,
      }
      const newApiKey = await createApiKeyService(apiKeyInput)
      await refetchApiKeys()
      setToast({
        message: 'New API Key was created!',
        type: 'positive',
        open: true,
      })
      openModal({
        name: 'show-api-key-modal',
        data: {
          token: newApiKey.token,
        },
      })
      navigate(`/api-key`)
    } catch (e) {
      console.error('Error:', e)
      setToast({
        message: 'Failed to create API Key!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    validationSchema: apiKeyValidation,
  })

  return {
    formik,
    handleSubmit,
    isLoading,
  }
}
