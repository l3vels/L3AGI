import { useQuery } from '@apollo/client'
import apiKeyByIdGql from '../../gql/apiKey/apiKeyById.gql'

export const useApiKeyByIdService = ({ id }: { id: string }) => {
  const {
    data: { apiKeyById } = {},
    error,
    loading,
    refetch,
  } = useQuery(apiKeyByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: apiKeyById,
    error,
    loading,
    refetch,
  }
}
