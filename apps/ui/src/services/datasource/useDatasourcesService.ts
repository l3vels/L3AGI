import { useQuery } from '@apollo/client'
import DATA_SOURCES_GQL from '../../gql/ai/datasource/datasources.gql'
import { DataSource } from 'types'

type UseDataSourcesServiceData = {
  dataSources: DataSource[]
}

export const useDatasourcesService = () => {
  const { data, error, loading, refetch } = useQuery<UseDataSourcesServiceData>(DATA_SOURCES_GQL)

  return {
    data: data?.dataSources || [],
    error,
    loading,
    refetch,
  }
}
