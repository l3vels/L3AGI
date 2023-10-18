import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useTeamOfAgentsService } from 'services/team/useTeamOfAgentsService'
import { useDeleteTeamOfAgentstByIdService } from 'services/team/useDeleteTeamOfAgentsById'

export const useTeamOfAgents = () => {
  const { setToast } = useContext(ToastContext)

  const {
    data: teamOfAgents,
    refetch: refetchTeamOfAgents,
    loading: teamsLoading,
  } = useTeamOfAgentsService()
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
              message: 'Team was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Team!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Team?',
      },
    })
  }

  return {
    teamOfAgents,
    deleteTeamOfAgentsHandler,
    refetchTeamOfAgents,
    teamsLoading,
  }
}
