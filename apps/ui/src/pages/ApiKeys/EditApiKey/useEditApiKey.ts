import { useFormik } from 'formik'
import { useApiKeyByIdService, useUpdateApiKeyService } from 'services/useApiKeyService'
import { apiKeyValidation } from 'utils/validationsSchema'
import { ToastContext } from 'contexts'
import { useEffect, useContext } from 'react'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'
import useCreateApiKey from '../CreateApiKey/useCreateApiKey'
import moment from 'moment'

const useEditApiKey = (props: { id: string; refetchApiList: any }) => {
  const { t } = useTranslation()
  const { closeModal, openModal } = useModal()
  const { setToast } = useContext(ToastContext)
  const { id, refetchApiList } = props
  const { data: apiKey, refetch: apiKeyRefetch } = useApiKeyByIdService({ id })
  const [updateApiKeyById] = useUpdateApiKeyService()

  const defaultValues = {
    name: apiKey.name,
    note: apiKey.note,
    expiration: moment(apiKey.expiration).format('YYYY-MM-DD'),
    games: apiKey.games,
  }

  // console.log('defaultValues', defaultValues)

  const handleSubmit = async (values: any) => {
    try {
      const newValues = {
        name: values.name,
        note: values.note,
        expiration: moment(values.expiration).format('YYYY-MM-DD'),
        games: values.games,
      }

      await updateApiKeyById(id, { ...newValues })

      setToast({
        message: t('API key successfully updated'),
        type: 'positive',
        open: true,
      })

      refetchApiList()
      apiKeyRefetch()
      closeModal('edit-api-keys-modal')
    } catch (error) {
      setToast({
        message: t('failed to updated API key'),
        type: 'negative',
        open: true,
      })
    }
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: apiKeyValidation,
    onSubmit: async values => handleSubmit(values),
  })

  useEffect(() => {
    apiKeyRefetch()
  }, [])

  return {
    formik,
  }
}

export default useEditApiKey
