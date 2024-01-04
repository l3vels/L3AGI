import { useMutation } from '@apollo/client'

import CREATE_CAMPAIGN_GQL from '../../gql/campaign/createCampaign.gql'

export interface CampaignInput {
  name: string
  agent_id: string
  group_id: string
  start_date: any
  type: string
}

export const useCreateCampaignService = () => {
  const [mutation] = useMutation(CREATE_CAMPAIGN_GQL)

  const createCampaignService = async (input: CampaignInput) => {
    const { name, agent_id, group_id, start_date, type } = input

    const {
      data: { createCampaign },
    } = await mutation({
      variables: {
        input: {
          name,
          agent_id,
          group_id,
          start_date,
          type,
        },
      },
    })

    return createCampaign
  }

  return [createCampaignService]
}
