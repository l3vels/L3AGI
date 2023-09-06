import { useQuery } from '@apollo/client'
import teamTypesGql from '../../gql/ai/teamOfAgents/teamTypes.gql'

export const useTeamTypesService = () => {
  const { data, error, loading, refetch } = useQuery(teamTypesGql)

  return {
    data: data?.getTeamTypes || [],
    error,
    loading,
    refetch,
  }
}
