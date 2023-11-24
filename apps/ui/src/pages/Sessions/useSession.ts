import { Moment } from 'moment'
import { useSchedules } from 'pages/Schedule/useSchedules'
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
  const { data: chatsData } = useChatsService()

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

  const filteredData = mappedData?.filter(
    (row: { name: string; agent_name: string; team_name: string; added_At: string }) => {
      const includesSearchText =
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.agent_name.toLowerCase().includes(searchText.toLowerCase())

      const includesSelectedAgents =
        selectedAgentNames.length === 0 ||
        selectedAgentNames.some(agent => row.agent_name.toLowerCase().includes(agent.toLowerCase()))

      const isInDateRange = filterByDateRange(row)

      return includesSearchText && includesSelectedAgents && isInDateRange
    },
  )

  return {
    scheduleOptions,
    agentOptions,
    filteredData,
    searchText,
    setSearchText,
    selectedAgentNames,
    setSelectedAgentNames,
    handleDateChange,
    startDate,
    endDate,
    filterByDateRange,
    clearSelectedDays,
  }
}
