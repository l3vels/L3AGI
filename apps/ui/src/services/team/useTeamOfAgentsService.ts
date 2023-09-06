import { useQuery } from '@apollo/client'
import teamOfAgentsGql from '../../gql/ai/teamOfAgents/teamOfAgents.gql'

export const useTeamOfAgentsService = () => {
  const { data, error, loading, refetch } = useQuery(teamOfAgentsGql)

  return {
    data: data?.getTeamOfAgents || [],
    error,
    loading,
    refetch,
  }
}
