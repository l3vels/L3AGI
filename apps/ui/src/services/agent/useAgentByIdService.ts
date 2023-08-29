import { useQuery } from '@apollo/client'
import agentByIdGql from '../../gql/ai/agent/agentById.gql'

export const useAgentByIdService = ({ id }: { id: string }) => {
  const {
    data: { agentById } = {},
    error,
    loading,
    refetch,
  } = useQuery(agentByIdGql, {
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
