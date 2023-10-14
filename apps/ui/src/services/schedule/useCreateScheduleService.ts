import { useMutation } from '@apollo/client'
import { truncate } from 'lodash/fp'

import CREATE_SCHEDULE_GQL from '../../gql/schedule/createSchedule.gql'

export interface ScheduleInput {
  name: string
  description: string
  is_active: boolean
  max_daily_budget: number
  cron_expression: string
  schedule_type: string
  agent_id: string
  group_id: string
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
      group_id,
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
            group_id,
          },
        },
      },
    })

    return createSchedule
  }

  return [createScheduleService]
}
