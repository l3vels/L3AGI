import { useAccountService } from 'services'

export const useGetAccountModule = () => {
  const { data: account } = useAccountService()

  const modules = account?.configs?.modules
  const naming = account?.configs?.naming

  const getMainModule = (moduleName: string) => {
    let values

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
    const values = getMainModule('Session')
    return values
  }
  const getScheduleModules = () => {
    const values = getMainModule('schedule')
    return values
  }

  const moduleNames = {
    chat: naming?.chat,
    home: naming?.home,
    agent: naming?.agent,
    team: naming?.team,
    datasource: naming?.datasource,
    discovery: naming?.discovery,
    models: naming?.models,
    schedule: naming?.schedules,
    toolkits: naming?.toolkits,
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
    moduleNames,
  }
}
