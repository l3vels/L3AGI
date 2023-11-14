import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContactsService } from 'plugins/contact/services/contact/useContactsService'
import { useCreateContactService } from 'plugins/contact/services/contact/useCreateContactService'
import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useImportContacts = () => {
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const initialValues = { file_url: '' }

  const [createContactService] = useCreateContactService()

  const { refetch: refetchContacts } = useContactsService()
  const { data: groups } = useGroupsService()

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const response = await fetch(values.file_url)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      let data

      // Check if the file is CSV or JSON based on the content type
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        // If the content type is JSON, parse the JSON data
        data = await response.json()
      } else {
        // If the content type is not JSON, assume it's CSV
        data = await response.text()
        const rows: any = []

        // Parsing CSV
        data
          .split('\n')
          .slice(1) // Skip header row
          .forEach(row => {
            const values = row.split(',')
            const rowData = {
              Name: values[0],
              Phone: values[1],
              Group: values[2],
              Email: values[3],
              Description: values[4],
            }
            rows.push(rowData)
          })

        data = rows
      }

      const contactValues = data
        .map((contact: any) => {
          const contactName = contact['Group'] || groups?.[0].name
          const group = groups?.find(
            (group: any) =>
              group.name.toLowerCase().replace(/\s/g, '') ===
              contactName.toLowerCase().replace(/\s/g, ''),
          )
          return {
            name: contact['Name'] || '',
            description: contact['Description'] || '',
            group_id: group?.id || groups?.[0].id,
            email: contact['Email'] || '',
            phone: contact['Phone'] || '',
          }
        })
        .filter(
          (contact: any) =>
            contact.name.length > 0 && contact.phone.length > 0 && contact.group_id.length > 0,
        )

      const promises = contactValues.map((contactValue: any) => createContactService(contactValue))
      await Promise.all(promises)

      await refetchContacts()
      setToast({
        message: 'New Contact was Created!',
        type: 'positive',
        open: true,
      })
      navigate('/contacts')
    } catch (error) {
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
    onSubmit: async values => handleSubmit(values),
    // validationSchema: agentValidationSchema,
    // enableReinitialize: true,
  })

  return {
    formik,
    isLoading,
  }
}
