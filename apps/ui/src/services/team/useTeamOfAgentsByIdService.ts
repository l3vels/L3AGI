import { useQuery } from '@apollo/client'
import teamOfAgentsByIdGql from '../../gql/ai/teamOfAgents/teamOfAgentsById.gql'

export const useTeamOfAgentsByIdService = ({ id }: { id?: string }) => {
  const {
    data: { teamOfAgentsById } = {},
    error,
    loading,
    refetch,
  } = useQuery(teamOfAgentsByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: teamOfAgentsById,
    error,
    loading,
    refetch,
  }
}
