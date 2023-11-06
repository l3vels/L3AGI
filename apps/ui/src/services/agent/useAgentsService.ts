import { useQuery } from '@apollo/client'
import agentsGql from '../../gql/ai/agent/agents.gql'
import { AgentWithConfigs } from 'types'

type UseAgentsServiceData = {
  getAgents: AgentWithConfigs[]
}

export const useAgentsService = () => {
  const { data, error, loading, refetch } = useQuery<UseAgentsServiceData>(agentsGql)

  return {
    data: data?.getAgents || [],
    error,
    loading,
    refetch,
  }
}
