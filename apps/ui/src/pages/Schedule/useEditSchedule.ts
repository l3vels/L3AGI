import { ToastContext } from 'contexts'
import { useFormik } from 'formik'

import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useScheduleByIdService } from 'services/schedule/useScheduleByIdService'
import { useSchedulesService } from 'services/schedule/useSchedulesService'
import { useUpdateScheduleService } from 'services/schedule/useUpdateScheduleService'
import { scheduleValidationSchema } from 'utils/validationsSchema'

export const useEditSchedule = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()
  const params = useParams()

  const { scheduleId } = params

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchSchedules } = useSchedulesService()

  const { data: scheduleById } = useScheduleByIdService({ id: scheduleId })

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
    schedule_name: schedule?.name,
    schedule_description: schedule?.description,
    schedule_is_active: schedule?.is_active,
    schedule_max_daily_budget: schedule?.max_daily_budget,
    schedule_cron_expression: schedule?.cron_expression,
    schedule_type: schedule?.schedule_type,
    schedule_agent_id: configs?.agent_id,
    schedule_group_id: configs?.group_id,

    agent_type: getAgentType(),
    tasks: configs?.tasks,
    is_recurring: configs?.is_recurring,
    create_session_on_run: configs?.create_session_on_run,
    start_date: schedule?.start_date?.split('T')[0],
    interval: schedule?.interval?.split(' ')[0],
    interval_unit: schedule?.interval?.split(' ')[1],
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const { agent_type } = values

    try {
      const updatedValues = {
        name: values.schedule_name,
        description: values.schedule_description,
        is_active: values.schedule_is_active,
        max_daily_budget: values.schedule_max_daily_budget,
        cron_expression: values.schedule_cron_expression,
        schedule_type: values.schedule_type,
        group_id: values.schedule_group_id,

        agent_id: agent_type === 'agent' ? values.schedule_agent_id : null,
        team_id: agent_type === 'team' ? values.schedule_agent_id : null,
        chat_id: agent_type === 'chat' ? values.schedule_agent_id : null,

        create_session_on_run: values.create_session_on_run,
        is_recurring: values.is_recurring,
        tasks: values.tasks,
        start_date: values.start_date,
        interval: values.is_recurring ? `${values.interval} ${values.interval_unit}` : undefined,
      }

      await updateSchedule(scheduleId || '', updatedValues)

      await refetchSchedules()

      setToast({
        message: 'New Schedule was Updated!',
        type: 'positive',
        open: true,
      })
      navigate('/schedules')
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
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: scheduleValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
  }
}
