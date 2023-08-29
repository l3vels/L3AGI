import { useQuery } from '@apollo/client'
import agentsGql from '../../gql/ai/agent/agents.gql'

export const useAgentsService = () => {
  const { data, error, loading, refetch } = useQuery(agentsGql)

  return {
    data: data?.getAgents || [],
    error,
    loading,
    refetch,
  }
}
