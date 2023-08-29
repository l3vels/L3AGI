import { useFormik } from 'formik'
import { useModal } from 'hooks'
// import useSnackbarAlert from 'hooks/useSnackbar'
import { useContext, useState } from 'react'
import { useCreateWebhookService, useWebhooksService } from 'services/useWebhookService'

import { useTranslation } from 'react-i18next'
import { webhookValidation } from 'utils/validationsSchema'
import { ToastContext } from 'contexts'

const initialValues = {
  url: '',
  description: '',
  status: '',
}

export const useCreateWebhook = () => {
  const { t } = useTranslation()
  const [page] = useState(1)
  const { openModal, closeModal } = useModal()

  const { refetch: webhookRefetch } = useWebhooksService({ page, limit: 30, search_text: '' })
  const [createWebhookService] = useCreateWebhookService()
  const { setToast } = useContext(ToastContext)
  // const { setSnackbar } = useSnackbarAlert()

  // const { data: gamesData } = useGamesService({
  //   page: 1,
  //   limit: 100,
  //   search_text: '',
  // })

  // const gamesOptions = gamesData?.items?.map((item: any) => ({
  //   value: item.id,
  //   label: item.name,
  // }))

  const handleSubmit = async (values: any) => {
    const newValues = {
      url: values.url,
      description: values.description,
    }

    const res = await createWebhookService(newValues, () => {})

    if (!res) {
      setToast({
        message: t('failed-to-add-new-webhook'),
        type: 'negative',
        open: true,
      })
      closeModal('create-webhook-modal')
      return
    }

    if (res) {
      setToast({
        message: t('new-webhook-was-created'),
        type: 'positive',
        open: true,
      })
      webhookRefetch()
      closeModal('create-webhook-modal')
      const urlValue = res.webhook.url
      openModal({ name: 'show-webhook-modal', data: { url: urlValue } })
    }
  }

  const openCreateWebhookModal = () => {
    openModal({
      name: 'create-webhook-modal',
    })
  }

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: webhookValidation,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    openCreateWebhookModal,
  }
}
