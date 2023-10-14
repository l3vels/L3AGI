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
  const { data: scheduleById } = useScheduleByIdService({ id: scheduleId || '' })

  const [updateSchedule] = useUpdateScheduleService()

  const defaultValues = {
    schedule_name: scheduleById?.schedule.name,
    schedule_description: scheduleById?.schedule.description,
    schedule_is_active: scheduleById?.schedule.is_active,
    schedule_max_daily_budget: scheduleById?.schedule.max_daily_budget,
    schedule_cron_expression: scheduleById?.schedule.cron_expression,
    schedule_type: scheduleById?.schedule.schedule_type,
    schedule_agent_id: scheduleById?.configs.agent_id,
    schedule_group_id: scheduleById?.configs.group_id,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const updatedValues = {
        name: values.schedule_name,
        description: values.schedule_description,
        is_active: values.schedule_is_active,
        max_daily_budget: values.schedule_max_daily_budget,
        cron_expression: values.schedule_cron_expression,
        schedule_type: values.schedule_type,
        agent_id: values.schedule_agent_id,
        group_id: values.schedule_group_id,
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
