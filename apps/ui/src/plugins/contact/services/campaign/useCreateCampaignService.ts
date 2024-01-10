import { useMutation } from '@apollo/client'

import CREATE_CAMPAIGN_GQL from '../../gql/campaign/createCampaign.gql'

export interface CampaignInput {
  name: string
  agent_id: string
  group_id: string
  start_date: any
  type: string
  retry_attempts: number
  retry_interval: number
  working_hours_start: string
  working_hours_end: string
  timezone: string
}

export const useCreateCampaignService = () => {
  const [mutation] = useMutation(CREATE_CAMPAIGN_GQL)

  const createCampaignService = async (input: CampaignInput) => {
    const {
      name,
      agent_id,
      group_id,
      start_date,
      type,
      retry_attempts,
      retry_interval,
      working_hours_start,
      working_hours_end,
      timezone,
    } = input

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
          retry_attempts,
          retry_interval,
          working_hours_start,
          working_hours_end,
          timezone,
        },
      },
    })

    return createCampaign
  }

  return [createCampaignService]
}
