import { useQuery } from '@apollo/client'
import checkTeamIsCreatedGql from '../../gql/ai/teamOfAgents/checkTeamIsCreated.gql'

export const useCheckTeamIsCreatedService = ({ id }: { id: string }) => {
  const { data, error, loading, refetch } = useQuery(checkTeamIsCreatedGql, {
    variables: { id: id },
    skip: !id,
  })

  return {
    data: data?.checkTeamIsCreated || false,
    error,
    loading,
    refetch,
  }
}
