import { useModal } from 'hooks'
import { useState } from 'react'

import { useWebhooksService } from 'services/useWebhookService'

export const useWebhook = () => {
  const [page] = useState(1)
  const { openModal } = useModal()

  const { data: webhooks, refetch: webhookRefetch } = useWebhooksService({
    page,
    limit: 30,
    search_text: '',
  })
  const openCreateWebhookModal = () => {
    openModal({
      name: 'create-webhook-modal',
    })
  }

  return {
    webhooks,
    openCreateWebhookModal,
  }
}
