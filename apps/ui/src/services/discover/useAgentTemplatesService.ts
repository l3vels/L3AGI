import { useQuery } from '@apollo/client'
import AgentTemplatesGql from '../../gql/ai/discover/agentTemplates.gql'

export const useAgentTemplatesService = () => {
  const { data, error, loading, refetch } = useQuery(AgentTemplatesGql)

  return {
    data: data?.getAgentTemplates || [],
    error,
    loading,
    refetch,
  }
}
