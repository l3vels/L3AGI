import { useContext, useState } from 'react'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'
import { ToastContext } from 'contexts' // Assuming you only need ToastContext
import { useApiKeysService } from 'services/apiKey/useApiKeysService'
import { useDeleteApiKeyByIdService } from 'services/apiKey/useDeleteApiKeyByIdService'

const useApiKeys = () => {
  const { openModal, closeModal } = useModal()
  const { setToast } = useContext(ToastContext)

  const { data: apiKeys, refetch: apiKeyRefetch } = useApiKeysService()
  const { deleteApiKeyById } = useDeleteApiKeyByIdService()

  const handleDeleteApiKey = async (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteApiKeyById(id)
            await apiKeyRefetch()
            closeModal('delete-confirmation-modal')
            setToast({
              message: 'API Key was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete API Key!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete API Key?',
      },
    })
  }

  return { apiKeys, handleDeleteApiKey }
}

export default useApiKeys
