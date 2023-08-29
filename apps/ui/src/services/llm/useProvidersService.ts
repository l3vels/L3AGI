import { useQuery } from '@apollo/client'
import providersGql from '../../gql/ai/llm/providers.gql'

export const useProvidersService = () => {
  const { data, error, loading, refetch } = useQuery(providersGql)

  return {
    data: data?.getProviders || [],
    error,
    loading,
    refetch,
  }
}
