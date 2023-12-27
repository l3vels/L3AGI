import { Moment } from 'moment'
import { useSchedules } from 'pages/Schedule/useSchedules'
import { useCallsService } from 'plugins/contact/services/call/useCallsService'
import { useState } from 'react'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useChatsService } from 'services/chat/useChatsService'
import { AgentWithConfigs, ScheduleWithConfigs } from 'types'

type Chat = {
  id: string
  name: string
  voice_url: string
  agent?: {
    agent?: {
      name: string
      id: string
      role: string
      description: string
    }
  }
  team?: {
    team?: {
      name: string
    }
  }
  addedAt: string
}

export const useSession = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedAgentNames, setSelectedAgentNames] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const { data: chatsData, count: chatsCount } = useChatsService({
    filter: [...selectedAgentNames, ...(searchText.length > 0 ? [searchText] : [])],
    itemsCount: 20,
    page,
  })

  const totalPages = Math.ceil(chatsCount / 20)

  const { data: calls } = useCallsService()

  const { schedules } = useSchedules()
  const { data: agentsData } = useAgentsService()

  const mappedData = chatsData?.map((chat: Chat) => ({
    id: chat?.id,
    name: chat?.name,
    agent_name: chat?.agent?.agent?.name,
    gent_role: chat?.agent?.agent?.role,
    gent_description: chat?.agent?.agent?.description,
    agent_id: chat?.agent?.agent?.id,
    team_name: chat?.team?.team?.name,
    added_At: new Date().toISOString(),
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

  const agentOptions = agentsData?.map((agent: AgentWithConfigs) => {
    return { value: agent.agent.name, label: agent.agent.name }
  })

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
  }
}
