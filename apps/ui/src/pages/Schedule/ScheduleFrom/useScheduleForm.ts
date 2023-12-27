import { useAgentsService } from 'services/agent/useAgentsService'
import { useChatsService } from 'services/chat/useChatsService'
import { useTeamOfAgentsService } from 'services/team/useTeamOfAgentsService'
// import { useGroupsService } from 'services/group/useGroupsService'

export const useScheduleForm = () => {
  const { data: agents } = useAgentsService()
  const { data: teams } = useTeamOfAgentsService()
  // const { data: groups } = useGroupsService()
  const { data: chats } = useChatsService({})

  const agentOptions = agents?.map((agentObj: any) => {
    return { label: agentObj.agent.name, value: agentObj.agent.id, type: 'agent' }
  })

  const teamOptions = teams?.map((team: any) => {
    return { label: team.name, value: team.id, type: 'team' }
  })

  const chatOptions = chats?.map((chat: any) => {
    return { label: chat.name, value: chat.id, type: 'chat' }
  })

  const options = [...agentOptions, ...teamOptions, ...chatOptions]

  // const groupOptions = groups?.map((group: any) => {
  //   return { label: group.name, value: group.id }
  // })

  const scheduleTypeOptions = [{ label: 'Run tasks', value: 'Run tasks' }]

  return {
    options,
    groupOptions: [],
    scheduleTypeOptions,
  }
}
