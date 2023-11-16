import { useSchedules } from 'pages/Schedule/useSchedules'
import { useState } from 'react'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useChatsService } from 'services/chat/useChatsService'
import { AgentWithConfigs, ScheduleWithConfigs } from 'types'

type Chat = {
  id: string
  name: string
  agent?: {
    agent?: {
      name: string
    }
  }
  team?: {
    team?: {
      name: string
    }
  }
}

type Schedule = {
  schedule: {
    name: string
  }
}

type Agent = {
  agent: {
    name: string
  }
}

export const useSession = () => {
  const [searchText, setSearchText] = useState('')
  const { data: chatsData } = useChatsService()

  const { schedules } = useSchedules()
  const { data: agentsData } = useAgentsService()

  const mappedData = chatsData?.map((chat: Chat) => ({
    id: chat?.id,
    name: chat?.name,
    agent_name: chat?.agent?.agent?.name,
    team_name: chat?.team?.team?.name,
  }))

  const scheduleOptions = schedules?.map((schedule: ScheduleWithConfigs) => ({
    value: schedule.schedule.name,
    label: schedule.schedule.name,
  }))

  const agentOptions = agentsData?.map((agent: AgentWithConfigs) => {
    return { value: agent.agent.name, label: agent.agent.name }
  })

  const filteredData = mappedData?.filter(
    (row: { name: string; agent_name: string; team_name: string }) =>
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.agent_name.toLowerCase().includes(searchText.toLowerCase()),
  )

  return {
    scheduleOptions,
    agentOptions,
    filteredData,
    searchText,
    setSearchText,
  }
}
