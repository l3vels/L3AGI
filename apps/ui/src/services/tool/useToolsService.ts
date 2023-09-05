import { useQuery } from '@apollo/client'
import toolsGql from '../../gql/ai/tool/tools.gql'

export const useToolsService = () => {
  const { data, error, loading, refetch } = useQuery(toolsGql)

  return {
    data: data?.getTools || [],
    error,
    loading,
    refetch,
  }
}
