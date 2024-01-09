import { useMutation } from '@apollo/client'
import DELETE_CAMPAIGN_GQL from '../../gql/campaign/deleteCampaign.gql'

export const useDeleteCampaignByIdService = () => {
  const [mutation, { loading }] = useMutation(DELETE_CAMPAIGN_GQL)

  const deleteCampaignById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteCampaign = data?.deleteCampaign || { message: '', success: false }
    return deleteCampaign
  }

  return { deleteCampaignById, loading }
}
