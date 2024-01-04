import { useQuery } from '@apollo/client'
import CAMPAIGN_GQL from '../../gql/campaign/campaigns.gql'

export const useCampaignsService = () => {
  const { data, error, loading, refetch } = useQuery(CAMPAIGN_GQL)

  return {
    data: data?.getCampaigns || [],
    error,
    loading,
    refetch,
  }
}
