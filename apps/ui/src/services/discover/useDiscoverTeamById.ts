import { useQuery } from '@apollo/client'
import discoverTeamByIdGql from '../../gql/ai/discover/discoverTeamById.gql'

export const useDiscoverTeamByIdService = ({ id }: { id?: string }) => {
  const {
    data: { discoverTeamById } = {},
    error,
    loading,
    refetch,
  } = useQuery(discoverTeamByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: discoverTeamById,
    error,
    loading,
    refetch,
  }
}
