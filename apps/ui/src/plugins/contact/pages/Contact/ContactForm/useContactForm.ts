import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import * as yup from 'yup'

export const contactValidationSchema = yup.object().shape({
  contact_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter name'),
  contact_group_id: yup.string().nullable(),
  contact_phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required('Please enter a valid phone number'),
})

export const useContactForm = () => {
  const { data: groups } = useGroupsService()

  const groupOptions = groups?.map((group: any) => {
    return { label: group.name, value: group.id }
  })

  return {
    groupOptions,
  }
}
