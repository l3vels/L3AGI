import { useSchedulesService } from 'services/schedule/useSchedulesService'

import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useDeleteScheduleByIdService } from 'services/schedule/useDeleteScheduleService'

export const useSchedules = () => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const { data: schedules, refetch: refetchSchedules } = useSchedulesService()

  const { deleteScheduleById } = useDeleteScheduleByIdService()

  const deleteScheduleHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteScheduleById(id)
            await refetchSchedules()
            closeModal('delete-confirmation-modal')
            setToast({
              message: 'Schedule was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Schedule!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Schedule?',
      },
    })
  }

  return {
    schedules,
    deleteScheduleHandler,
  }
}
