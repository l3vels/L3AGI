import * as yup from 'yup'

export const apiKeyValidation = yup.object().shape({
  name: yup.string().required('Name cannot be blank'),
  note: yup.string().nullable(),
  expiration: yup.date().nullable(),
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
  schedule_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter name'),
  schedule_agent_id: yup.string().required('Please pick Agent'),
  schedule_group_id: yup.string().required('Please pick Group'),
  schedule_max_daily_budget: yup
    .number()
    .required('Please enter budget')
    .positive('Budget must be a positive number')
    .min(0.1, 'Budget must be at least 0.1'),
  schedule_cron_expression: yup
    .string()
    .required('Please enter cron expression')
    .matches(/^(\*|\d+)(\/\d+)?(\s+(\*|\d+)(\/\d+)?){4}$/, 'Invalid cron expression'),
})