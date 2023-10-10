import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { IAccountQuery, IAccountQueryLazy } from './interfaces'

// import { loader } from 'graphql.macro'

import getAccountQuery from '../gql/account/getAccount.gql'
import inviteUserGql from '../gql/account/inviteUser.gql'
import userAccountsGql from '../gql/account/userAccounts.gql'
import assignedUserListGql from '../gql/account/assignedUserList.gql'
import userAccountGql from '../gql/account/userAccount.gql'
import deleteShareGql from '../gql/account/deleteShare.gql'
import updateAccountForAdminMutation from '../gql/account/updateAccountForAdmin.gql'
import accountByIdGql from '../gql/account/accountByUserId.gql'

export const useAccountService = (): IAccountQuery => {
  const {
    data: { account } = {},
    error,
    loading,
    refetch,
  } = useQuery(getAccountQuery, { fetchPolicy: 'cache-first' })

  return {
    data: account || {},
    error,
    loading,
    refetch,
  }
}

export const useAccountServiceLazy = (): IAccountQueryLazy => {
  const [getAccount, { data: { account } = [], error, loading, refetch }] = useLazyQuery(
    getAccountQuery,
    { variables: {}, fetchPolicy: 'cache-first' },
  )

  return {
    data: account || {},
    error,
    loading,
    refetch,
    getAccount,
  }
}

export const useInviteUserService = () => {
  const [create, { loading }] = useMutation(inviteUserGql)

  const inviteUser = async (email: string) => {
    try {
      const {
        data: { inviteUser },
        errors,
      }: any = await create({ variables: { email } })
      // return { inviteUser: inviteUser, ...(errors && errors.length ? { hasError: errors.errors[0] } : {})  }
      return inviteUser || errors[0]
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }

  return { inviteUser, loading }
}

export const useDeleteAccountAccessService = () => {
  const [update, { loading }] = useMutation(deleteShareGql)

  const deleteAccountAccess = async (id: string) => {
    try {
      const {
        data: { deleteAccountAccess },
        errors,
      }: any = await update({ variables: { share_id: id } })
      return deleteAccountAccess || errors[0]
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }

  return { deleteAccountAccess, loading }
}

export const useUserAccountsService = () => {
  const {
    data: { userAccounts } = [],
    error,
    loading,
    refetch,
  } = useQuery(userAccountsGql, { fetchPolicy: 'cache-first' })

  return {
    data: userAccounts || [],
    error,
    loading,
    refetch,
  }
}

export const useUserAccountService = () => {
  const {
    data: { userAccount } = {},
    error,
    loading,
    refetch,
  } = useQuery(userAccountGql, { fetchPolicy: 'cache-first' })

  return {
    data: userAccount || {},
    error,
    loading,
    refetch,
  }
}

export const useAssignedUserListService = () => {
  //todo Add it later
  // const { data: { assignedUserList } = [], error, loading, refetch } = useQuery(assignedUserListGql)

  // return {
  //   data: assignedUserList || [],
  //   error,
  //   loading,
  //   refetch,
  // }
  return {
    data: [],
    refetch: () => {},
  }
}

export const useAccountByIdService = (id: string) => {
  const {
    data: { accountByUserId } = [],
    error,
    loading,
    refetch,
  } = useQuery(accountByIdGql, { variables: { id }, fetchPolicy: 'cache-first' })

  return {
    data: accountByUserId || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateAccountService = () => {
  const [update] = useMutation(updateAccountForAdminMutation)

  const updateAccountForAdmin = async (id: string, input: any) => {
    try {
      const {
        data: { updateAccountForAdmin },
      } = await update({
        variables: { id, input: { ...input } },
      })
      return updateAccountForAdmin
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }
  return [updateAccountForAdmin]
}
