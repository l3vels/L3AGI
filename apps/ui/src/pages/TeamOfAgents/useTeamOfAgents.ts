import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useTeamOfAgentsService } from 'services/teamOfAgents/useTeamOfAgentsService'
import { useDeleteTeamOfAgentstByIdService } from 'services/teamOfAgents/useDeleteTeamOfAgentsById'

export const useTeamOfAgents = () => {
  const { setToast } = useContext(ToastContext)

  const { data: teamOfAgents, refetch: refetchTeamOfAgents } = useTeamOfAgentsService()
  const { deleteTeamOfAgentsById } = useDeleteTeamOfAgentstByIdService()

  const { openModal, closeModal } = useModal()

  const deleteTeamOfAgentsHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteTeamOfAgentsById(id)
            await refetchTeamOfAgents()
            closeModal('delete-confirmation-modal')
            setToast({
              message: 'TeamOfAgents was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete TeamOfAgents!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        closeModal: () => {
          closeModal('delete-confirmation-modal')
        },
        label: 'Delete TeamOfAgents?',
        title: 'Delete TeamOfAgents?',
      },
    })
  }

  return {
    teamOfAgents,
    deleteTeamOfAgentsHandler,
    refetchTeamOfAgents,
  }
}
