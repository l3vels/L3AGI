import { useAccountService } from 'services'

export const useGetAccountModule = () => {
  const { data: account } = useAccountService()

  const modules = account?.configs?.modules

  const homeModuleAgents = true // modules?.home?.showAgents
  const homeModuleTeams = true // modules?.home?.showAgents

  const chatModuleAddTeam = modules?.chat?.actions?.addTeam
  const chatModuleAddAgent = modules?.chat?.actions?.addAgent
  const chatModuleCreateAgentChannel = modules?.chat?.actions?.createAgentChannel
  const chatModuleCreateTeamChannel = modules?.chat?.actions?.createTeamChannel

  const chatModule = modules?.chat?.active
  const contactModule = modules?.contact?.active
  const datasourceModule = modules?.datasource?.active
  const discoveryModule = modules?.discovery?.active
  const groupModule = modules?.group?.active
  const homeModule = modules?.home?.active
  const modelModule = modules?.model?.active
  const scheduleModule = modules?.schedule?.active
  const toolkitModule = modules?.toolkit?.active

  return {
    homeModuleAgents,
    homeModuleTeams,
    chatModuleAddAgent,
    chatModuleAddTeam,
    chatModule,
    contactModule,
    datasourceModule,
    discoveryModule,
    groupModule,
    homeModule,
    modelModule,
    scheduleModule,
    toolkitModule,
    chatModuleCreateAgentChannel,
    chatModuleCreateTeamChannel,
  }
}
