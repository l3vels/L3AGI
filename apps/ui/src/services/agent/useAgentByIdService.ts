import { useQuery } from '@apollo/client'
import agentByIdGql from '../../gql/ai/agent/agentById.gql'
import { AgentWithConfigs } from 'types'

type UseAgentByIdServiceData = {
  agentById: AgentWithConfigs
}

type UseAgentByIdServiceVariables = {
  id: string
}

export const useAgentByIdService = ({ id }: UseAgentByIdServiceVariables) => {
  const {
    data: { agentById } = {},
    error,
    loading,
    refetch,
  } = useQuery<UseAgentByIdServiceData, UseAgentByIdServiceVariables>(agentByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: agentById,
    error,
    loading,
    refetch,
  }
}
