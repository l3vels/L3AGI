import { useQuery, useMutation } from '@apollo/client'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import getUserAccess from '../../gql/inviteUser/getUserAccess.gql'
import createUserAccessGql from '../../gql/inviteUser/createUserAccess.gql'
import deleteUserAccessGql from '../../gql/inviteUser/deleteUserAccess.gql'
import getSharedUserAccessGql from '../../gql/inviteUser/getSharedUserAccess.gql'

export const useGetUserAccess = () => {
    const { data, error, loading, refetch } = useQuery(getUserAccess)

    try {
        if (error) {
            // Handle error here
            console.error("Error fetching user access:", error)
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("An unexpected error occurred:", error)
    }

    return {
        data: data?.getUserAccess || [],
        error,
        loading,
        refetch,
    }
}

export const useCreateUserAccessService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(createUserAccessGql)

    const createUserAccess = async (email: string) => {
        try {
            const {
                data: { createUserAccess },
            } = await mutation({
                variables: {
                    input: {
                        email
                    },
                },
            })

            return createUserAccess
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error creating user access',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { createUserAccess, loading }
}

export const useDeleteUserAccessService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(deleteUserAccessGql)

    const deleteUserAccess = async (id: string) => {
        try {
            const {
                data: { deleteUserAccess },
            } = await mutation({
                variables: {
                    id
                },
            })

            return deleteUserAccess
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error deleting user access',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { deleteUserAccess, loading }
}

export const useGetSharedUserAccess = () => {
    const { data, error, loading, refetch } = useQuery(getSharedUserAccessGql)

    try {
        if (error) {
            // Handle error here
            console.error("Error fetching user access:", error)
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("An unexpected error occurred:", error)
    }

    return {
        data: data?.getSharedUserAccess || [],
        error,
        loading,
        refetch,
    }
}