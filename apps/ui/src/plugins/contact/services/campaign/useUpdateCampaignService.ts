import { useMutation } from '@apollo/client'
import UPDATE_CAMPAIGN_GQL from '../../gql/campaign/updateCampaign.gql'

import { CampaignInput } from './useCreateCampaignService'

export const useUpdateCampaignService = () => {
  const [mutation] = useMutation(UPDATE_CAMPAIGN_GQL)
  const updateCampaign = async (id: string, input: CampaignInput) => {
    const {
      name,
      agent_id,
      group_id,
      type,
      start_date,
      retry_attempts,
      retry_interval,
      working_hours_start,
      working_hours_end,
      timezone,
    } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name,
          agent_id,
          group_id,
          type,
          start_date,
          retry_attempts,
          retry_interval,
          working_hours_start,
          working_hours_end,
          timezone,
        },
      },
    })
    return data
  }

  return [updateCampaign]
}
