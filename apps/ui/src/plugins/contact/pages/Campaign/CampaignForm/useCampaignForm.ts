import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import { useAgentsService } from 'services/agent/useAgentsService'

import * as yup from 'yup'

export const campaignValidationSchema = yup.object().shape({
  campaign_name: yup
    .string()
    .nullable()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter name'),
  campaign_group_id: yup.string().nullable().required('Pick Group!'),
  campaign_agent_id: yup.string().nullable().required('Pick Agent!'),
  campaign_start_date: yup.date().required('Please enter start date'),
})

export const useCampaignForm = () => {
  const { data: agentsData } = useAgentsService()
  const { data: groupsData } = useGroupsService()

  const agentOptions = agentsData
    ?.filter(({ agent }) => agent.agent_type === 'voice')
    ?.map(({ agent }) => {
      return { value: agent.id, label: agent.name }
    })

  const groupOptions = groupsData?.map(({ id, name }: { id: string; name: string }) => {
    return { value: id, label: name }
  })

  const campaignTypeOption = [
    { value: 'outbound', label: 'Outbound' },
    { value: 'inbound', label: 'Inbound' },
  ]

  return {
    agentOptions,
    groupOptions,
    campaignTypeOption,
  }
}
