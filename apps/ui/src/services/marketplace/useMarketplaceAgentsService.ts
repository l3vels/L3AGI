import { useQuery } from '@apollo/client'
import discoverAgentsGql from '../../gql/ai/discover/discoverAgents.gql'

export const useDiscoverAgentsService = () => {
  const { data, error, loading, refetch } = useQuery(discoverAgentsGql)

  return {
    data: data?.getDiscoverAgents || [],
    error,
    loading,
    refetch,
  }
}
