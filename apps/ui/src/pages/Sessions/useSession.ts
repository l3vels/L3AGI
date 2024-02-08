import { Moment } from 'moment'
import { useSchedules } from 'pages/Schedule/useSchedules'
import { useCallsService } from 'plugins/contact/services/call/useCallsService'
import { useCampaignsService } from 'plugins/contact/services/campaign/useCampaignsService'
import { useEffect, useMemo, useState } from 'react'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useChatsService } from 'services/chat/useChatsService'
import { AgentWithConfigs, ScheduleWithConfigs } from 'types'
import { getAgentTypeText } from 'utils/agentUtils'

export type Chat = {
  id: string
  name: string
  voice_url: string
  agent?: AgentWithConfigs
  created_on: Date
  team?: {
    team?: {
      name: string
    }
  }
  addedAt: string
}

export const useSession = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedAgentType, setSelectedAgentType] = useState<any>(null)
  const [selectedAgentNames, setSelectedAgentNames] = useState<any>([])
  const [selectedCampaign, setSelectedCampaign] = useState<any>([])
  // const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const {
    data: chatsData,
    count: chatsCount,
    loading: chatsLoading,
    refetch: refetchChats,
  } = useChatsService({
    filter: [
      ...(selectedAgentNames?.map((agent: any) => agent.value) || []),
      ...(searchText.length > 0 ? [searchText] : []),
      ...(selectedAgentType?.value === 'inbound' ||
      selectedAgentType?.value === 'outbound' ||
      selectedAgentType?.value === 'text'
        ? [selectedAgentType?.value]
        : []),
      ...(selectedCampaign?.map((campaign: any) => campaign.value) || []),
    ],
    itemsCount: 20,
    page,
  })

  const totalPages = Math.ceil(chatsCount / 20)

  const { data: calls } = useCallsService()
  const { data: campaigns } = useCampaignsService()

  const { schedules } = useSchedules()
  const { data: agentsData } = useAgentsService()

  const mappedData = chatsData?.map((chat: Chat) => ({
    id: chat?.id,
    name: chat?.name,
    agent_name: `${chat?.agent?.agent?.name} · ${getAgentTypeText(chat?.agent?.agent?.agent_type)}`,
    gent_role: chat?.agent?.agent?.role,
    gent_description: chat?.agent?.agent?.description,
    agent_id: chat?.agent?.agent?.id,
    team_name: chat?.team?.team?.name,
    added_At: chat?.created_on,
    voice_url: chat?.voice_url,
    sentiment: calls?.find((call: any) => call.chat_id === chat.id)?.sentiment,
    status: calls?.find((call: any) => call.chat_id === chat.id)?.status,
  }))

  const [startDate, setStartDate] = useState<Moment | null>(null)
  const [endDate, setEndDate] = useState<Moment | null>(null)

  const handleDateChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null
    endDate: Moment | null
  }) => {
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const clearSelectedDays = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const filterByDateRange = (row: { added_At: string }) => {
    return (
      !startDate ||
      !endDate ||
      (new Date(row.added_At) >= startDate.toDate() && new Date(row.added_At) <= endDate.toDate())
    )
  }

  const scheduleOptions = schedules?.map((schedule: ScheduleWithConfigs) => ({
    value: schedule.schedule.name,
    label: schedule.schedule.name,
  }))

  const agentOptions = agentsData?.map(({ agent }) => {
    return {
      value: agent.name,
      label: `${agent.name} · ${getAgentTypeText(agent.agent_type)}`,
    }
  })

  const campaignOptions = useMemo(() => {
    return campaigns?.map((campaign: any) => {
      return {
        value: campaign.id,
        label: `${campaign.name}`,
      }
    })
  }, [campaigns])

  useEffect(() => {
    if (selectedCampaign || selectedAgentNames || selectedAgentType || searchText) return

    refetchChats()
  }, [])

  return {
    scheduleOptions,
    agentOptions,
    filteredData: mappedData,
    searchText,
    setSearchText,
    selectedAgentNames,
    setSelectedAgentNames,
    handleDateChange,
    startDate,
    endDate,
    filterByDateRange,
    clearSelectedDays,
    setPage,
    page,
    totalPages,
    chatsLoading,
    setSelectedAgentType,
    selectedAgentType,
    setSelectedCampaign,
    selectedCampaign,
    campaignOptions,
  }
}
