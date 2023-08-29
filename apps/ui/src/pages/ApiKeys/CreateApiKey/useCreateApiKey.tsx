import { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useCreateApiKeyService, useApiKeysService } from 'services/useApiKeyService'
import { ToastContext } from 'contexts'
import { apiKeyValidation } from 'utils/validationsSchema'

import useSnackbarAlert from 'hooks/useSnackbar'

import { useModal } from 'hooks'

import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

const initialValues = {
  name: '',
  note: '',
  expiration: '',
  games: [],
}

const useCreateApiKey = () => {
  const { t } = useTranslation()
  const [page] = useState(1)
  const { closeModal, openModal } = useModal()

  const { refetch: apiKeyRefetch } = useApiKeysService({ page, limit: 30, search_text: '' })
  const [createApiKeyService] = useCreateApiKeyService()
  const { setSnackbar } = useSnackbarAlert()
  const { setToast } = useContext(ToastContext)

  const handleSubmit = async (values: any) => {
    const newValues = {
      name: values.name,
      note: values.note,
      expiration: values.expiration,
      games: values.games,
    }

    const res = await createApiKeyService(newValues, () => {})

    if (!res) {
      setToast({ message: t('failed-to-add-new-api-key'), type: 'negative', open: true })
      closeModal('add-api-keys-modal')
      return
    }

    if (res) {
      setToast({
        message: t('new-api-key-was-created'),
        type: 'positive',
        open: true,
      })

      apiKeyRefetch()
      closeModal('add-api-keys-modal')
      const tokenValue = res.apiKey.token
      openModal({ name: 'show-api-key-modal', data: { token: tokenValue } })
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: apiKeyValidation,
    onSubmit: async values => handleSubmit(values),
  })

  const formHook = useForm({
    defaultValues: initialValues,
  })

  useEffect(() => {
    apiKeyRefetch()
  }, [])

  return {
    formik,

    formHook,
    handleSubmit,
  }
}

export default useCreateApiKey
