import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import { useAgentsService } from 'services/agent/useAgentsService'
import { isVoiceAgent } from 'utils/agentUtils'
import { TIMEZONES } from 'utils/timezones'

import * as yup from 'yup'

export const campaignValidationSchema = yup.object().shape({
  campaign_name: yup
    .string()
    .nullable()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter name'),
  campaign_group_id: yup.string().nullable().required('Pick Group!'),
  campaign_start_date: yup.date().required('Please enter start date'),
})

export const useCampaignForm = () => {
  const { data: agentsData } = useAgentsService()
  const { data: groupsData } = useGroupsService()

  const agentOptions = agentsData
    ?.filter(({ agent }) => isVoiceAgent(agent.agent_type))
    ?.map(({ agent }) => {
      return {
        value: agent.id,
        label: `${agent.name}${agent.role?.length > 0 ? ` - ${agent.role}` : ''}`,
      }
    })

  const groupOptions = groupsData?.map(({ id, name }: { id: string; name: string }) => {
    return { value: id, label: name }
  })

  const campaignTypeOption = [
    { value: 'Outbound', label: 'Outbound' },
    { value: 'Inbound', label: 'Inbound' },
  ]

  const timezoneOptions = TIMEZONES.map(({ zone, gmt, name }) => ({
    value: zone,
    label: `${name} ${gmt}`,
  }))

  return {
    agentOptions,
    groupOptions,
    campaignTypeOption,
    timezoneOptions,
  }
}
