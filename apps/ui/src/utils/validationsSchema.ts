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
    .required('Please use a valid email format. Example - user@l3vels.xyz'),
})
