import { useQuery } from '@apollo/client'
import apiKeysGql from '../../gql/apiKey/apiKeys.gql'

export const useApiKeysService = () => {
  const { data, error, loading, refetch } = useQuery(apiKeysGql)

  return {
    data: data?.getApiKeys || [],
    error,
    loading,
    refetch,
  }
}
