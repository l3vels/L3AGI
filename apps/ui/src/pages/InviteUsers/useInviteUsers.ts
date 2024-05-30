import * as yup from 'yup'

import { 
    useGetUserAccess,
    useCreateUserAccessService,
    useDeleteUserAccessService,
} from 'services/inviteUser/useInviteUserService'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useNavigate } from 'react-router-dom'
import { renderColumns } from './columnConfig'

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .required('Please use a valid email format. Example - user@l3agi.com')
})

const useInviteUsers = () => {
    const { setToast } = useContext(ToastContext)
    const navigate = useNavigate()
    const [deleting_id, setDeletingId] = React.useState<string>('')

    const { data, loading: fetch_data_loading, refetch } = useGetUserAccess()
    const { createUserAccess, loading: create_access_loading } = useCreateUserAccessService()
    const { deleteUserAccess: deleteUserAccessService, loading: deleting_loading } = useDeleteUserAccessService()

    const formik = useFormik({
        initialValues: { email: '' },
        onSubmit: values => handleSubmit(values),
        validationSchema,
    })

    async function handleSubmit(values: { email: string }) {

        const result = await createUserAccess(values.email);

        if(result) {
            setToast({
                message: result.message,
                type: result.success ? 'positive' : 'warning',
                open: true,
            })

            if(result.success) {
                navigate(`/invite-user`)
            }
        }

    }

    const deleteUserAccess = async (id: string) => {
        setDeletingId(id)
        const result = await deleteUserAccessService(id)
        if(result) {
            if(result.success) {
                refetch()
            }
            setToast({
                message: result.message,
                type: result.success ? 'positive' : 'warning',
                open: true,
            })
        }
    }

    const columns = renderColumns({ 
        deleteUserAccess, 
        deleting_loading: { loading: deleting_loading, id: deleting_id } 
    })

    return {
        data,
        fetch_data_loading,
        create_access_loading,
        formik,
        deleteUserAccess,
        columns,
    }
}

export default useInviteUsers