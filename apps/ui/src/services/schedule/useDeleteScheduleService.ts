import { useMutation } from '@apollo/client'
import DELETE_SCHEDULE_GQL from '../../gql/schedule/deleteSchedule.gql'

export const useDeleteScheduleByIdService = () => {
  const [mutation, { loading }] = useMutation(DELETE_SCHEDULE_GQL)

  const deleteScheduleById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteSchedule = data?.deleteSchedule || { message: '', success: false }
    return deleteSchedule
  }

  return { deleteScheduleById, loading }
}
