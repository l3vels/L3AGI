import { useAccountService } from 'services'

export const useGetAccountModule = () => {
  const { data: account } = useAccountService()

  const modules = account?.configs?.modules

  const configs = account?.configs

  const homeModuleAgents = true // modules?.home?.showAgents
  const homeModuleTeams = true // modules?.home?.showAgents

  const chatModuleAddTeam = true //modules?.chat?.actions?.addTeam
  const chatModuleAddAgent = true //modules?.chat?.actions?.addAgent
  const chatModuleCreateAgentChannel = true //modules?.chat?.actions?.createAgentChannel
  const chatModuleCreateTeamChannel = true //modules?.chat?.actions?.createTeamChannel

  const chatModule = modules?.chat?.active
  const contactModule = modules?.contact?.active
  const datasourceModule = modules?.datasource?.active
  const discoveryModule = modules?.discovery?.active
  const groupModule = modules?.group?.active
  const homeModule = modules?.home?.active
  const modelModule = modules?.model?.active
  const scheduleModule = modules?.schedule?.active
  const toolkitModule = modules?.toolkit?.active

  const getSubModules = (mainModule: string, moduleName: string) => {
    const module = modules?.[mainModule]?.submodules[moduleName]

    let values

    if (typeof module?.operations === 'object') {
      values = {
        create: module?.operations?.create === undefined ? true : module?.operations?.create,
        list: module?.operations?.list === undefined ? true : module?.operations?.list,
        edit: module?.operations?.edit === undefined ? true : module?.operations?.edit,
        delete: module?.operations?.delete === undefined ? true : module?.operations?.delete,
      }
    } else if (
      (typeof module === 'boolean' && module) ||
      (typeof module?.operations === 'boolean' && module?.operations)
    ) {
      values = {
        create: true,
        list: true,
        edit: true,
        delete: true,
      }
    } else {
      values = {
        create: false,
        list: false,
        edit: false,
        delete: false,
      }
    }

    return values
  }

  const getChatModules = (subModuleName: 'team' | 'agent' | 'session') => {
    const values = getSubModules('chat', subModuleName)

    return values
  }
  const getModelModules = (subModuleName: 'models' | 'fine-tuning') => {
    const values = getSubModules('model', subModuleName)

    return values
  }

  // const chatTeamModule = getChatModules('team')
  // console.log('chatTeamModule', chatTeamModule)
  // const chatAgentModule = getChatModules('agent')
  // console.log('chatAgentModule', chatAgentModule)
  // const chatSessionModule = getChatModules("session")
  // console.log('chatSessionModule', chatSessionModule)
  // const modelModelsModule = getModelModules('models')
  // console.log('modelModelsModule', modelModelsModule)
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
