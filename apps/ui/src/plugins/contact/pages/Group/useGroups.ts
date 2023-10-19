import { useGroupsService } from 'services/group/useGroupsService'

import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useDeleteGroupByIdService } from 'services/group/useDeleteGroupService'

export const useGroups = () => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const { data: groups, refetch: refetchGroups } = useGroupsService()

  const { deleteGroupById } = useDeleteGroupByIdService()

  const deleteGroupHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteGroupById(id)
            await refetchGroups()
            closeModal('delete-confirmation-modal')
            setToast({
              message: 'Group was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Group!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Group?',
      },
    })
  }

  return {
    groups,
    deleteGroupHandler,
  }
}
