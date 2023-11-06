import { useMutation } from '@apollo/client'
import deleteApiKeyByIdGql from '../../gql/apiKey/deleteApikeyById.gql'

export const useDeleteApiKeyByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteApiKeyByIdGql)

  const deleteApiKeyById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteApiKey = data?.deleteApiKey || { message: '', success: false }
    return deleteApiKey
  }

  return { deleteApiKeyById, loading }
}
