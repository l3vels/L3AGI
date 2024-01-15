export const useEnvModuleConfig = () => {
  const domainEnv = import.meta.env

  const config = {
    naming: {
      chat: domainEnv.REACT_APP_CHAT_NAMING,
      home: domainEnv.REACT_APP_HOME_NAMING,
      agent: domainEnv.REACT_APP_AGENT_NAMING,
      team: domainEnv.REACT_APP_TEAM_NAMING,
      datasource: domainEnv.REACT_APP_DATASOURCE_NAMING,
      discovery: domainEnv.REACT_APP_DISCOVERY_NAMING,
      models: domainEnv.REACT_APP_MODEL_NAMING,
      schedules: domainEnv.REACT_APP_SCHEDULES_NAMING,
      toolkits: domainEnv.REACT_APP_TOOLKIT_NAMING,
      integrations: domainEnv.REACT_APP_INTEGRATION_NAMING,
    },
  }

  return { config }
}
