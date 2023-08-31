import { useQuery } from '@apollo/client'
import marketplaceAgentsGql from '../../gql/ai/marketplace/marketplaceAgents.gql'

export const useMarketplaceAgentsService = () => {
  const { data, error, loading, refetch } = useQuery(marketplaceAgentsGql)

  return {
    data: data?.getMarketplaceAgents || [],
    error,
    loading,
    refetch,
  }
}
