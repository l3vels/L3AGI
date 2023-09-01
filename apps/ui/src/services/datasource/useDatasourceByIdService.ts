import { useQuery } from '@apollo/client'
import datasourceByIdGql from '../../gql/ai/datasource/datasourceById.gql'

export const useDatasourceByIdService = ({ id }: { id: string }) => {
  const {
    data: { datasourceById } = {},
    error,
    loading,
    refetch,
  } = useQuery(datasourceByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: datasourceById,
    error,
    loading,
    refetch,
  }
}
