import { useContext, useState } from 'react'

import { useApiKeysService, useDeleteApiKeyService } from 'services/useApiKeyService'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'
import { AuthContext, ToastContext } from 'contexts'

const useApiKeys = () => {
  const [page] = useState(1)
  const { openModal, closeModal } = useModal()
  const { t } = useTranslation()
  const { setToast } = useContext(ToastContext)

  const { data: apiKeys, refetch: apiKeyRefetch } = useApiKeysService({
    page,
    limit: 30,
    search_text: '',
  })

  const [deleteApiKeyByIdService] = useDeleteApiKeyService()

  const handleEditApiKey = (apiKey: any) => {
    openModal({
      name: 'edit-api-keys-modal',
      data: { id: apiKey.id, refetchApiList: apiKeyRefetch },
    })
  }

  const handleDeleteApiKey = async (apiKeyId: string) => {
    const res = await deleteApiKeyByIdService(apiKeyId)
    if (!res || !res.success) {
      return setToast({
        message: 'failed to delete API Key',
        type: 'negative',
        open: true,
      })
    }
    setToast({
      message: t('API key was deleted'),
      type: 'positive',
      open: true,
    })
    apiKeyRefetch()
    closeModal('create-team-modal')
  }

  return { apiKeys, handleEditApiKey, handleDeleteApiKey }
}

export default useApiKeys
