import { ToastContext } from 'contexts'
import { useFormik } from 'formik'

import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useScheduleByIdService } from 'services/schedule/useScheduleByIdService'
import { useSchedulesService } from 'services/schedule/useSchedulesService'
import { useUpdateScheduleService } from 'services/schedule/useUpdateScheduleService'
import { scheduleValidationSchema } from 'utils/validationsSchema'
import { getDateTime } from './Schedule.utils'
import { useModal } from 'hooks'

interface ScheduleFormValues {
  name: string
  description: string
  is_active: boolean
  max_daily_budget: number
  cron_expression: string
  schedule_type: string
  agent_id: string
  agent_type: string
  create_session_on_run: boolean
  group_id?: string | null
  end_date?: string | undefined
  interval?: string | undefined
  interval_unit?: string | undefined
  is_recurring: boolean
  start_date: string
  tasks: string[]
}

export const useEditSchedule = ({ incomingScheduleId }: { incomingScheduleId?: string }) => {
  const { setToast } = useContext(ToastContext)

  const { closeModal } = useModal()

  const navigate = useNavigate()
  const params = useParams()

  const { scheduleId } = params

  const finalScheduleId = scheduleId || incomingScheduleId || ''

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchSchedules } = useSchedulesService()

  const { data: scheduleById } = useScheduleByIdService({ id: finalScheduleId })

  const [updateSchedule] = useUpdateScheduleService()

  const schedule = scheduleById?.schedule
  const configs = scheduleById?.configs

  const getAgentType = () => {
    if (!configs) return

    if (configs.agent_id) return 'agent'
    if (configs.team_id) return 'team'
    if (configs.chat_id) return 'chat'
  }

  const defaultValues = {
    name: schedule?.name,
    description: schedule?.description,
    is_active: schedule?.is_active,
    max_daily_budget: schedule?.max_daily_budget,
    cron_expression: schedule?.cron_expression,
    schedule_type: schedule?.schedule_type,
    agent_id: configs?.agent_id,
    group_id: configs?.group_id,

    agent_type: getAgentType(),
    tasks: configs?.tasks,
    is_recurring: configs?.is_recurring,
    create_session_on_run: configs?.create_session_on_run,
    start_date: getDateTime(schedule?.start_date),
    end_date: getDateTime(schedule?.end_date),
    interval: schedule?.interval?.split(' ')[0],
    interval_unit: schedule?.interval?.split(' ')[1],
  }

  const handleSubmit = async (values: ScheduleFormValues) => {
    if (!finalScheduleId) return

    setIsLoading(true)

    const { agent_type } = values

    try {
      await updateSchedule(finalScheduleId, {
        schedule: {
          name: values.name,
          description: values.description,
          schedule_type: values.schedule_type,
          start_date: new Date(values.start_date).toISOString(),
          end_date: values.end_date ? new Date(values.end_date).toISOString() : null,
          interval: values.is_recurring ? `${values.interval} ${values.interval_unit}` : undefined,
          is_active: values.is_active,
          cron_expression: values.cron_expression,
          max_daily_budget: values.max_daily_budget,
        },
        configs: {
          agent_id: agent_type === 'agent' ? values.agent_id : undefined,
          team_id: agent_type === 'team' ? values.agent_id : undefined,
          chat_id: agent_type === 'chat' ? values.agent_id : undefined,
          group_id: values.group_id || undefined,
          create_session_on_run: values.create_session_on_run,
          is_recurring: values.is_recurring,
          tasks: values.tasks,
        },
      })

      await refetchSchedules()

      setToast({
        message: 'New Schedule was Updated!',
        type: 'positive',
        open: true,
      })
      closeModal('edit-schedule-modal')
    } catch (e) {
      setToast({
        message: 'Failed To Update Schedule!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }
  const formik = useFormik({
    initialValues: {
      name: schedule?.name || '',
      description: schedule?.description || '',
      is_active: schedule?.is_active || false,
      max_daily_budget: schedule?.max_daily_budget || 0,
      cron_expression: schedule?.cron_expression || '',
      schedule_type: schedule?.schedule_type || '',
      agent_id: configs?.agent_id || '',
      group_id: configs?.group_id || '',
      agent_type: getAgentType() || '',
      tasks: configs?.tasks || [],
      is_recurring: configs?.is_recurring || false,
      create_session_on_run: configs?.create_session_on_run || false,
      start_date: getDateTime(schedule?.start_date) || '',
      end_date: getDateTime(schedule?.end_date) || '',
      interval: (schedule?.interval || '').split(' ')[0] || '',
      interval_unit: (schedule?.interval || '').split(' ')[1] || '',
    },
    enableReinitialize: true,
    validationSchema: scheduleValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
  }
}
