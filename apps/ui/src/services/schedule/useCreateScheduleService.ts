import { useMutation } from '@apollo/client'

import CREATE_SCHEDULE_GQL from '../../gql/schedule/createSchedule.gql'

export interface ScheduleInput {
  name: string
  description?: string
  is_active?: boolean
  max_daily_budget?: number
  cron_expression?: string
  schedule_type?: string
  agent_id?: string
  team_id?: string
  chat_id?: string
  group_id?: string
  create_session_on_run: boolean
  run_immediately: boolean
  tasks: string[]
}

export const useCreateScheduleService = () => {
  const [mutation] = useMutation(CREATE_SCHEDULE_GQL)

  const createScheduleService = async (input: ScheduleInput) => {
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
      run_immediately,
      create_session_on_run,
      tasks,
    } = input

    const {
      data: { createSchedule },
    } = await mutation({
      variables: {
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
            team_id,
            chat_id,
            group_id,
            create_session_on_run,
            run_immediately,
            tasks,
          },
        },
      },
    })

    return createSchedule
  }

  return [createScheduleService]
}
