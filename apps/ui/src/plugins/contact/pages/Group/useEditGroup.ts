import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useGroupByIdService } from 'plugins/contact/services/group/useGroupByIdService'
import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import { useUpdateGroupService } from 'plugins/contact/services/group/useUpdateGroupService'

import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { groupValidationSchema } from './useCreateGroup'

export const useEditGroup = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()
  const params = useParams()

  const { groupId } = params

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchGroups } = useGroupsService()
  const { data: groupById } = useGroupByIdService({ id: groupId || '' })

  const [updateGroup] = useUpdateGroupService()

  const defaultValues = {
    group_name: groupById?.name,
    group_description: groupById?.description,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const updatedValues = {
        name: values.group_name,
        description: values.group_description,
      }

      await updateGroup(groupId || '', updatedValues)

      await refetchGroups()

      setToast({
        message: 'Group was Updated!',
        type: 'positive',
        open: true,
      })
      // navigate('/contacts?tab=group')
    } catch (e) {
      setToast({
        message: 'Failed To Update Group!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: groupValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
  }
}
