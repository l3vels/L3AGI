import { useContext } from 'react'
import { useModal } from 'hooks'
import { useDeleteFineTuningByIdService } from 'services/fineTuning/useDeleteFineTuningService'
import { useFineTuningsService } from 'services/fineTuning/useFIneTuningsService'
import { ToastContext } from 'contexts'

export const useFineTuning = () => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const { data: fineTuningData, refetch: refetchFineTunings } = useFineTuningsService()
  const { deleteFineTuningById } = useDeleteFineTuningByIdService()

  const deleteFineTuningHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteFineTuningById(id)
            await refetchFineTunings()
            closeModal('delete-confirmation-modal')

            setToast({
              message: 'FineTuning was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete FineTuning!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete FineTuning?',
      },
    })
  }

  return {
    fineTuningData,
    deleteFineTuningHandler,
  }
}
