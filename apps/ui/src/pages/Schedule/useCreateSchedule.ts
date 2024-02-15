import { useContext, useState } from 'react'

import { ToastContext } from 'contexts'

import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSchedulesService } from 'services/schedule/useSchedulesService'
import { useCreateScheduleService } from 'services/schedule/useCreateScheduleService'
import { scheduleValidationSchema } from 'utils/validationsSchema'
import { useModal } from 'hooks'
import { getDateTimeFromDate } from './Schedule.utils'

type UseCreateScheduleProps = {
  initialValues: Record<string, unknown>
  agentId?: string
}

export const useCreateSchedule = ({ initialValues, agentId }: UseCreateScheduleProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { closeModal } = useModal()

  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [createScheduleService] = useCreateScheduleService()

  const { data: schedule, refetch: refetchSchedule } = useSchedulesService()

  const defaultValues = {
    name: '',
    description: '',
    is_active: true,
    max_daily_budget: 0.1,
    cron_expression: '* * * * *',
    schedule_type: 'Run tasks',

    group_id: null,

    agent_type: '',
    tasks: ['Enter you task'],
    is_recurring: false,
    create_session_on_run: false,
    start_date: getDateTimeFromDate(new Date()),
    end_date: null,
    interval: '',
    interval_unit: '',

    ...initialValues,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const { agent_type } = values

    try {
      await createScheduleService({
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
          agent_id: agentId,
          team_id: agent_type === 'team' ? values.agent_id : null,
          chat_id: agent_type === 'chat' ? values.agent_id : null,
          group_id: values.group_id,
          create_session_on_run: values.create_session_on_run,
          is_recurring: values.is_recurring,
          tasks: values.tasks,
        },
      })

      await refetchSchedule()

      setToast({
        message: 'New Schedule was Created!',
        type: 'positive',
        open: true,
      })

      if (location.pathname.includes('schedules')) {
        navigate('/schedules')
      } else {
        closeModal('schedule-run-modal')
        closeModal('create-schedule-modal')
      }
    } catch (e) {
      setToast({
        message: 'Failed To Add Schedule!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: scheduleValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    schedule,
    formik,
    isLoading,
  }
}
