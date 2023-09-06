import { useQuery } from '@apollo/client'
import teamOfAgentssGql from '../../gql/ai/teamOfAgents/teamOfAgentss.gql'

export const useTeamOfAgentssService = () => {
  const { data, error, loading, refetch } = useQuery(teamOfAgentssGql)

  return {
    data: data?.getTeamOfAgentss || [],
    error,
    loading,
    refetch,
  }
}
