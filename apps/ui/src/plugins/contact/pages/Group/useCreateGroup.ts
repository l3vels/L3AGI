import { useContext, useEffect, useState } from 'react'

import { ToastContext } from 'contexts'
import { useModal } from 'hooks'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useCreateGroupService } from 'plugins/contact/services/group/useCreateGroupService'
import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import * as yup from 'yup'

export const groupValidationSchema = yup.object().shape({
  group_name: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter name'),
})

export const useCreateGroup = () => {
  const navigate = useNavigate()

  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const [isLoading, setIsLoading] = useState(false)

  const [createGroupService] = useCreateGroupService()

  const { data: groups, refetch: refetchGroups } = useGroupsService()

  const initialValues = {
    group_name: '',
    group_description: '',
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const groupInput = {
        name: values.group_name,
        description: values.group_description,
      }

      const group = await createGroupService(groupInput)

      await refetchGroups()
      setToast({
        message: 'New Group was Created!',
        type: 'positive',
        open: true,
      })
      navigate(`/datasources/${group.id}/edit-group`)
    } catch (e) {
      setToast({
        message: 'Failed To Add Group!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: groupValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    groups,
    formik,
    isLoading,
  }
}
