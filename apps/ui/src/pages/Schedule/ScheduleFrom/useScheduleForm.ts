import { useAgentsService } from 'services/agent/useAgentsService'
// import { useGroupsService } from 'services/group/useGroupsService'

export const useScheduleForm = () => {
  const { data: agents } = useAgentsService()
  // const { data: groups } = useGroupsService()

  const agentOptions = agents?.map((agentObj: any) => {
    return { label: agentObj.agent.name, value: agentObj.agent.id }
  })

  // const groupOptions = groups?.map((group: any) => {
  //   return { label: group.name, value: group.id }
  // })

  const scheduleTypeOptions = [{ label: 'Outbound Calling', value: 'Outbound Calling' }]

  return {
    agentOptions,
    groupOptions : [],
    scheduleTypeOptions,
  }
}
