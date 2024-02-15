import { useContext, useState } from 'react'

import { ToastContext } from 'contexts'

import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreateContactService } from 'plugins/contact/services/contact/useCreateContactService'
import { useContactsService } from 'plugins/contact/services/contact/useContactsService'
import { contactValidationSchema } from './ContactForm/useContactForm'

export const useCreateContact = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { groupId } = params

  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [createContactService] = useCreateContactService()

  const { data: contacts, refetch: refetchContacts } = useContactsService()

  const initialValues = {
    contact_name: '',
    contact_description: '',

    contact_email: '',
    contact_phone: '',
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const contactInput = {
        name: values.contact_name,
        description: values.contact_description,
        group_id: groupId || '',
        email: values.contact_email,
        phone: values.contact_phone,
      }

      await createContactService(contactInput)

      await refetchContacts()
      setToast({
        message: 'New Contact was Added!',
        type: 'positive',
        open: true,
      })
      navigate(`/datasources/${groupId}/edit-group`)
    } catch (e) {
      setToast({
        message: 'Failed To Add Contact!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: contactValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    contacts,
    formik,
    isLoading,
  }
}
