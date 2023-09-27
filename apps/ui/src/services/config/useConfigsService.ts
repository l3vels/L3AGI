import { useQuery } from '@apollo/client'
import configsGql from '../../gql/ai/config/configs.gql'

export const useConfigsService = () => {
  const { data, error, loading, refetch } = useQuery(configsGql)

  return {
    data: data?.configs || null,
    error,
    loading,
    refetch,
  }
}
