import { useAccountService } from 'services'
import { useEnvModuleConfig } from './useEnvModuleConfig'

export const useGetAccountModule = () => {
  const { data: account } = useAccountService()
  const { config: envConfig } = useEnvModuleConfig()

  console.log('envModuleConfig', envConfig)

  const domainEnv = import.meta.env

  const modules = account?.configs?.modules
  const naming = account?.configs?.naming
  const welcomeMessage = modules?.home?.welcome_message

  const getMainModule = (moduleName: string) => {
    let values

    if (modules?.[moduleName] === undefined) return true

    if (typeof modules?.[moduleName] === 'object') {
      values = modules?.[moduleName]?.active === undefined ? true : modules?.[moduleName]?.active
    } else if (typeof modules?.[moduleName] === 'boolean') {
      values = modules?.[moduleName]
    }

    return values
  }

  const getSubModules = (mainModuleName: string, moduleName: string) => {
    const trueValues = {
      create: true,
      list: true,
      edit: true,
      delete: true,
    }
    const falseValues = {
      create: false,
      list: false,
      edit: false,
      delete: false,
    }

    let values

    const mainModule = modules?.[mainModuleName]

    const module = modules?.[mainModuleName]?.submodules?.[moduleName]

    if (mainModule === undefined) return trueValues

    if (module === undefined) return trueValues

    if (typeof mainModule === 'boolean' && mainModule) {
      values = trueValues
    } else if (typeof mainModule === 'boolean' && !mainModule) {
      values = falseValues
    } else if (typeof module?.operations === 'object') {
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
      values = trueValues
    } else {
      values = falseValues
    }

    return values
  }

  const getHomeModules = (search: 'team' | 'agent' | 'discovery' | 'active') => {
    let values
    if (search === 'active') {
      values = getMainModule('home')
    } else {
      values = getSubModules('home', search)
    }
    return values
  }

  const getChatModules = (search: 'team' | 'agent' | 'session' | 'active') => {
    let values
    if (search === 'active') {
      values = getMainModule('chat')
    } else {
      values = getSubModules('chat', search)
    }
    return values
  }

  const getModelModules = (search: 'models' | 'fine-tuning' | 'active') => {
    let values
    if (search === 'active') {
      values = getMainModule('model')
    } else {
      values = getSubModules('model', search)
    }
    return values
  }

  const getIntegrationModules = (search: 'toolkit' | 'voices' | 'telephony' | 'active') => {
    let values
    if (search === 'active') {
      values = getMainModule('integration')
    } else {
      values = getSubModules('integration', search)
    }
    return values
  }

  const getToolkitModules = () => {
    const values = getMainModule('toolkit')
    return values
  }
  const getDatasourceModules = () => {
    const values = getMainModule('datasource')
    return values
  }
  const getDiscoveryModules = () => {
    const values = getMainModule('discovery')
    return values
  }
  const getSessionModules = () => {
    const values = getMainModule('session')
    return values
  }
  const getScheduleModules = () => {
    const values = getMainModule('schedule')
    return values
  }
  const getContactModules = () => {
    const values = getMainModule('contact')
    return values
  }
  const getGroupModules = () => {
    const values = getMainModule('group')
    return values
  }
  const getExternalLinksModule = () => {
    const values = getMainModule('external-links')
    return values
  }

  const moduleNames = {
    welcome: welcomeMessage,
    chat: domainEnv.REACT_APP_CHAT_NAMING || naming?.chat,
    home: domainEnv.REACT_APP_HOME_NAMING || naming?.home,
    agent: domainEnv.REACT_APP_AGENT_NAMING || naming?.agent,
    team: domainEnv.REACT_APP_TEAM_NAMING || naming?.team,
    datasource: domainEnv.REACT_APP_DATASOURCE_NAMING || naming?.datasource,
    discovery: domainEnv.REACT_APP_DISCOVERY_NAMING || naming?.discovery,
    models: domainEnv.REACT_APP_MODEL_NAMING || naming?.models,
    schedule: domainEnv.REACT_APP_SCHEDULES_NAMING || naming?.schedules,
    toolkits: domainEnv.REACT_APP_TOOLKIT_NAMING || naming?.toolkits,
    integration: domainEnv.REACT_APP_INTEGRATION_NAMING || naming?.integrations,
  }

  return {
    getHomeModules,
    getChatModules,
    getModelModules,
    getToolkitModules,
    getDatasourceModules,
    getDiscoveryModules,
    getSessionModules,
    getScheduleModules,
    getContactModules,
    getGroupModules,
    getIntegrationModules,
    getExternalLinksModule,
    moduleNames,
  }
}
