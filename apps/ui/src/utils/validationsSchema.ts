import * as yup from 'yup'
import cronstrue from 'cronstrue'

export const apiKeyValidation = yup.object().shape({
  name: yup.string().required('Name cannot be blank'),
  description: yup.string().nullable(),
})

export const webhookValidation = yup.object().shape({
  url: yup.string().url('Invalid URL').required('Required'),
  description: yup.string().nullable(),
})

export const administrationValidation = yup.object().shape({
  shared_email: yup
    .string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@l3agi.com'),
})

export const agentValidationSchema = yup.object().shape({
  agent_name: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter name'),
})

export const datasourceValidationSchema = yup.object().shape({
  datasource_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter name'),
})

export const scheduleValidationSchema = yup.object().shape({
  name: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter name'),

  // schedule_group_id: yup.string().required('Please pick Group'),
  // schedule_max_daily_budget: yup
  //   .number()
  //   .required('Please enter budget')
  //   .positive('Budget must be a positive number')
  //   .min(0.1, 'Budget must be at least 0.1'),
  cron_expression: yup
    .string()
    .required('Please enter cron expression')
    .test('is-cron', 'Invalid cron expression', value => {
      if (!value) return false

      try {
        cronstrue.toString(value)
        return true
      } catch (e) {
        return false
      }
    }),
})

export const fineTuningValidationSchema = yup.object().shape({
  fine_tuning_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter name'),
  fine_tuning_model: yup.string().required('Please pick Model'),
  fine_tuning_file_url: yup.string().required('Please Upload File'),
})
