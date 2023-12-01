import { useFormik } from 'formik'
import { apiKeyValidation } from 'utils/validationsSchema'
import { ToastContext } from 'contexts'
import { useContext, useState } from 'react'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useUpdateApiKeyService } from 'services/apiKey/useUpdateApiKeyService'
import { useApiKeyByIdService } from 'services/apiKey/useApiKeyByIdService'
import { useNavigate, useParams } from 'react-router-dom'

const useEditApiKey = () => {
  const { t } = useTranslation()
  const { closeModal } = useModal()
  const navigate = useNavigate()
  const params = useParams()
  const apiKeyId: string | undefined = params.apiKeyId
  const { setToast } = useContext(ToastContext)
  const { data: apiKeyById, refetch: apiKeyRefetch } = useApiKeyByIdService({ id: apiKeyId || '' })
  const [updateApiKeyById] = useUpdateApiKeyService()
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues = {
    name: apiKeyById?.name,
    description: apiKeyById?.description,
  }

  const handleSubmit = async (values: { name: string; description: string }) => {
    setIsLoading(true)
    try {
      const newValues = {
        name: values.name,
        description: values.description,
      }

      if (apiKeyId) {
        await updateApiKeyById(apiKeyId, { ...newValues })
      }
      navigate('/api-key')
      setToast({
        message: t('API key successfully updated'),
        type: 'positive',
        open: true,
      })
      apiKeyRefetch()
      closeModal('edit-api-keys-modal')
    } catch (error) {
      setToast({
        message: t('failed to updated API key'),
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: apiKeyValidation,
    onSubmit: async values => handleSubmit(values),
  })

  // useEffect(() => {
  //   apiKeyRefetch()
  // }, [])

  return {
    formik,
    isLoading,
    handleSubmit,
  }
}

export default useEditApiKey
