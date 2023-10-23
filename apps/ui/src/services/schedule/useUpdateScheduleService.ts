import { useMutation } from '@apollo/client'
import UPDATE_SCHEDULE_GQL from '../../gql/schedule/updateSchedule.gql'
import { ScheduleInput } from './useCreateScheduleService'

type UseUpdateScheduleServiceData = {
  updateSchedule: {
    id: string
  }
}

type UseUpdateScheduleServiceVariables = {
  id: string
  input: ScheduleInput
}

export const useUpdateScheduleService = () => {
  const [mutation] = useMutation<UseUpdateScheduleServiceData, UseUpdateScheduleServiceVariables>(
    UPDATE_SCHEDULE_GQL,
  )

  const updateSchedule = async (id: string, input: ScheduleInput) => {
    const { data } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return data
  }

  return [updateSchedule]
}
