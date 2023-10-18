import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useDeleteAgentByIdService } from 'services/agent/useDeleteAgentByIdService'

export const useAgents = () => {
  const { setToast } = useContext(ToastContext)

  const { openModal, closeModal } = useModal()

  const { data: agentsData, refetch: refetchAgents, loading: agentsLoading } = useAgentsService()

  const { deleteAgentById } = useDeleteAgentByIdService()

  const deleteAgentHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteAgentById(id)
            await refetchAgents()
            closeModal('delete-confirmation-modal')
            closeModal('agent-view-modal')

            setToast({
              message: 'Agent was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Agent!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Agent?',
      },
    })
  }

  return {
    agentsData,
    deleteAgentHandler,
    refetchAgents,
    agentsLoading,
  }
}
