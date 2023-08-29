import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'
import { IUsersQuery } from './interfaces'

import userQuery from '../gql/user/user.gql'
import usersByAdminQuery from '../gql/user/usersByAdmin.gql'
import userByIdQuery from '../gql/user/userById.gql'
import updateUserMutation from '../gql/user/updateUser.gql'
import changePasswordMutation from '../gql/user/changePassword.gql'
import activeTwoFactorByAdminMutation from '../gql/user/activeTwoFactorByAdmin.gql'
import resendPasswordMutation from '../gql/user/resendPassword.gql'
import updateRoleByAdminMutation from '../gql/user/updateRoleByAdmin.gql'
import createUserMutation from '../gql/user/createUser.gql'
import deleteUserMutation from '../gql/user/deleteUser.gql'

type ChangePasswordType = {
  current_password: string
  new_password: string
}

export const useUserService = ({ skip = false }) => {
  const {
    data: { user } = [],
    error,
    loading,
    refetch,
  } = useQuery(userQuery, { variables: {}, skip, fetchPolicy: 'network-only' })

  return {
    data: user || null,
    error,
    loading: user ? false : loading,
    refetch,
  }
}

export const useUserServiceLazy = ({ id = null }) => {
  const [getUser, { data: { user } = [], error, loading, refetch }] = useLazyQuery(userQuery, {
    variables: { id },
  })

  return {
    data: user || {},
    error,
    loading,
    refetch,
    getUser,
  }
}

export const useUsersByAdminService = ({
  page,
  limit,
  search_text,
}: {
  page: number
  limit: number
  search_text?: string
}): IUsersQuery => {
  const {
    data: { usersByAdmin } = [],
    error,
    loading,
    refetch,
  } = useQuery(usersByAdminQuery, {
    variables: { filter: { page, limit, search_text } },
    fetchPolicy: 'cache-first',
  })

  return {
    data: usersByAdmin || [],
    error,
    loading,
    refetch,
  }
}

export const useUserByIdService = ({ id }: { id: any }) => {
  const {
    data: { userById } = [],
    error,
    loading,
    refetch,
  } = useQuery(userByIdQuery, { variables: { id }, fetchPolicy: 'network-only' })

  return {
    data: userById || {},
    error,
    loading,
    refetch,
  }
}

export const useChangePasswordService = () => {
  const [mutation] = useMutation(changePasswordMutation)

  const changePassword = async (
    input: ChangePasswordType,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { changePassword },
    } = await mutation({
      variables: {
        input,
      },
    })
    return changePassword
  }

  return [changePassword]
}

export const useResendPasswordService = ({
  id,
  onCompleted,
}: {
  id: string
  onCompleted: () => void
}) => {
  const [mutation] = useMutation(resendPasswordMutation, { variables: { id }, onCompleted })

  const resendPassword = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { resendPassword },
    } = await mutation({ variables: { id } })
    return resendPassword
  }

  return [resendPassword]
}

export const useDeleteUserService = ({
  id,
  onCompleted,
}: {
  id: string
  onCompleted: () => void
}) => {
  const [mutation] = useMutation(deleteUserMutation, { variables: { id }, onCompleted })

  const deleteUser = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteUser },
    } = await mutation({ variables: { id } })
    return deleteUser
  }
  return [deleteUser]
}

interface UpdateUserInput {
  first_name: string

  last_name: string

  contact_number: string
}

export const useUpdateUserService = () => {
  const [update] = useMutation(updateUserMutation)

  const updateUser = async (id: string, user: UpdateUserInput) => {
    try {
      const {
        data: { updateUser },
      } = await update({
        variables: { id, user: { ...user, contact_number: +user.contact_number } },
      })
      return updateUser
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }
  return [updateUser]
}

export const useActiveTwoFactorByAdminService = () => {
  const [activeTwoFactor] = useMutation(activeTwoFactorByAdminMutation)

  const activeTwoFactorByAdmin = async (id: string, enable_2fa: boolean) => {
    try {
      const {
        data: { activeTwoFactorByAdmin },
      } = await activeTwoFactor({
        variables: { id, enable_2fa },
      })
      return activeTwoFactorByAdmin
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }
  return [activeTwoFactorByAdmin]
}

interface CreateUserInput {
  email: string

  first_name: string

  last_name: string

  contact_number: string

  role: string
}

export const useCreateUserService = () => {
  const [create, { loading }] = useMutation(createUserMutation)
  const createUser = async (user: CreateUserInput) => {
    try {
      const {
        data: { createUser },
      } = await create({ variables: { user } })
      return createUser
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }

  return { createUser, loading }
}

export const useChangeRoleByAdminService = () => {
  const [mutation] = useMutation(updateRoleByAdminMutation)

  const updateRoleByAdmin = async (id: string, role: string) => {
    const {
      data: { updateRoleByAdmin },
    } = await mutation({ variables: { id, role } })
    return updateRoleByAdmin
  }

  return [updateRoleByAdmin]
}
