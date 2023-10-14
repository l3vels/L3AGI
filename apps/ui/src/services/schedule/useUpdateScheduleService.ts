import { useMutation } from '@apollo/client'
import UPDATE_SCHEDULE_GQL from '../../gql/schedule/updateSchedule.gql'
import { ScheduleInput } from './useCreateScheduleService'

export const useUpdateScheduleService = () => {
  const [mutation] = useMutation(UPDATE_SCHEDULE_GQL)
  const updateSchedule = async (id: string, input: ScheduleInput) => {
    const {
      name,
      description,
      is_active,
      max_daily_budget,
      cron_expression,
      schedule_type,
      agent_id,
      group_id,
    } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          schedule: {
            is_active,
            name,
            schedule_type,
            description,
            max_daily_budget,
            cron_expression,
          },
          configs: {
            agent_id,
            group_id,
          },
        },
      },
    })
    return data
  }

  return [updateSchedule]
}
