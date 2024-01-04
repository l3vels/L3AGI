import { useQuery } from '@apollo/client'
import CAMPAIGN_BY_ID_GQL from '../../gql/campaign/campaignById.gql'

export const useCampaignByIdService = ({ id }: { id: string }) => {
  const {
    data: { campaignById } = {},
    error,
    loading,
    refetch,
  } = useQuery(CAMPAIGN_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: campaignById,
    error,
    loading,
    refetch,
  }
}
