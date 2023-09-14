import { useQuery } from '@apollo/client'
import teamOfAgentsPublicGql from '../../gql/ai/teamOfAgents/teamOfAgentsPublic.gql'

export const useTeamOfAgentsPublicService = () => {
  const { data, error, loading, refetch } = useQuery(teamOfAgentsPublicGql)

  return {
    data: data?.getTeamOfAgentsPublic || [],
    error,
    loading,
    refetch,
  }
}
