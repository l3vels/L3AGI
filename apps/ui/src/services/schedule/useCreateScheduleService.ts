import { useMutation } from '@apollo/client'

import CREATE_SCHEDULE_GQL from '../../gql/schedule/createSchedule.gql'
import { Nullable } from 'types'

export interface ScheduleInput {
  schedule: {
    name: string
    description?: string
    is_active?: boolean
    max_daily_budget?: number
    cron_expression?: string
    schedule_type?: string
    start_date: string
    end_date: Nullable<string>
    interval?: string
  }
  configs: {
    agent_id?: string
    team_id?: string
    chat_id?: string
    group_id?: string
    create_session_on_run: boolean
    is_recurring: boolean
    tasks: string[]
  }
}

type UseCreateScheduleServiceData = {
  createSchedule: {
    id: string
  }
}

type UseCreateScheduleServiceVariables = {
  input: ScheduleInput
}

export const useCreateScheduleService = () => {
  const [mutation] = useMutation<UseCreateScheduleServiceData, UseCreateScheduleServiceVariables>(
    CREATE_SCHEDULE_GQL,
  )

  const createScheduleService = async (input: ScheduleInput) => {
    const { data } = await mutation({
      variables: {
        input,
      },
    })

    return data?.createSchedule
  }

  return [createScheduleService]
}
