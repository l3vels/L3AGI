import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContactsService } from 'plugins/contact/services/contact/useContactsService'
import { useCreateContactService } from 'plugins/contact/services/contact/useCreateContactService'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useImportContacts = () => {
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const initialValues = { file_url: '' }

  const [createContactService] = useCreateContactService()

  const { refetch: refetchContacts } = useContactsService()

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const response = await fetch(values.file_url)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      let data
      let firstRow
      // Check if the file is CSV or JSON based on the content type
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        // If the content type is JSON, parse the JSON data
        data = await response.json()
        firstRow = data[0]
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
        // Assuming there is at least one row in the CSV
        firstRow = rows[0]
      }

      // Assigning values to initialValues object
      const contactInput = {
        name: firstRow['Name'],
        description: firstRow['Description'],
        group_id: firstRow['Group'],
        email: firstRow['Email'],
        phone: firstRow['Phone'],
      }

      await createContactService(contactInput)
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

      console.error('Error fetching file:', error)
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
