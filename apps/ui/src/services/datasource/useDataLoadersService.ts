import { useQuery } from '@apollo/client'
import dataLoadersGql from '../../gql/ai/datasource/dataLoaders.gql'

export const useDataLoadersService = () => {
  const { data, error, loading, refetch } = useQuery(dataLoadersGql)

  return {
    data: data?.getDataLoaders || [],
    error,
    loading,
    refetch,
  }
}
