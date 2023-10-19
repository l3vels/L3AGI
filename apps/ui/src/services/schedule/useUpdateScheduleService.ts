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
      team_id,
      chat_id,
      group_id,
      is_recurring,
      create_session_on_run,
      tasks,
      start_date,
      interval,
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
            start_date,
            interval,
          },
          configs: {
            agent_id,
            group_id,
            team_id,
            chat_id,
            create_session_on_run,
            is_recurring,
            tasks,
          },
        },
      },
    })
    return data
  }

  return [updateSchedule]
}
