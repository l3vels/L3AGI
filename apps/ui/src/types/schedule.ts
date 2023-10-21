import { Nullable } from './utils'

export interface ScheduleWithConfigs {
  schedule: Schedule
  configs: ScheduleConfigs
}

export interface Schedule {
  id: string
  is_active: boolean
  name: string
  schedule_type: string
  description: string
  max_daily_budget: number
  cron_expression: string
  start_date: string
  end_date: Nullable<string>
  interval: string
}

export interface ScheduleConfigs {
  agent_id: Nullable<string>
  team_id: Nullable<string>
  chat_id: Nullable<string>
  group_id: Nullable<string>
  is_recurring: boolean
  create_session_on_run: boolean
  tasks: string[]
}
