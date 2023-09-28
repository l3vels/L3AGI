import { useQuery } from '@apollo/client'
import teamOfAgentsByIdGql from '../../gql/ai/teamOfAgents/teamOfAgentsById.gql'
import { Nullable } from 'types'

export const useTeamOfAgentsByIdService = ({ id }: { id?: Nullable<string> }) => {
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
