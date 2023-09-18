import { useQuery } from '@apollo/client'
import discoverAgentByIdGql from '../../gql/ai/discover/discoverAgentById.gql'

export const useDiscoverAgentByIdService = ({ id }: { id: string }) => {
  const {
    data: { discoverAgentById } = {},
    error,
    loading,
    refetch,
  } = useQuery(discoverAgentByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: discoverAgentById,
    error,
    loading,
    refetch,
  }
}
