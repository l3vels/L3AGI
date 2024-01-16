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
    modules: {
      home: {
        submodules: {
          active: true,
          team: true,
          agent: true,
          discovery: true,
        },
      },
      chat: {
        active: true,
        submodules: {
          team: {
            operations: {
              create: domainEnv.REACT_APP_CHAT_TEAM_CREATE === 'false' ? false : true,
              list: domainEnv.REACT_APP_CHAT_TEAM_LIST === 'false' ? false : true,
              edit: domainEnv.REACT_APP_CHAT_TEAM_EDIT === 'false' ? false : true,
              delete: domainEnv.REACT_APP_CHAT_TEAM_DELETE === 'false' ? false : true,
            },
          },
          agent: {
            operations: {
              create: domainEnv.REACT_APP_CHAT_AGENT_CREATE === 'false' ? false : true,
              list: domainEnv.REACT_APP_CHAT_AGENT_LIST === 'false' ? false : true,
              edit: domainEnv.REACT_APP_CHAT_AGENT_EDIT === 'false' ? false : true,
              delete: domainEnv.REACT_APP_CHAT_AGENT_DELETE === 'false' ? false : true,
            },
          },
          discovery: true,
        },
      },
      model: {
        active: true,
        submodules: {
          models: {
            operations: {
              create: domainEnv.REACT_APP_MODELS_CREATE === 'false' ? false : true,
              list: domainEnv.REACT_APP_MODELS_LIST === 'false' ? false : true,
              edit: domainEnv.REACT_APP_MODELS_EDIT === 'false' ? false : true,
              delete: domainEnv.REACT_APP_MODELS_DELETE === 'false' ? false : true,
            },
          },
          'fine-tuning': {
            operations: {
              create: domainEnv.REACT_APP_FINE_TUNINGS_CREATE === 'false' ? false : true,
              list: domainEnv.REACT_APP_FINE_TUNINGS_LIST === 'false' ? false : true,
              edit: domainEnv.REACT_APP_FINE_TUNINGS_EDIT === 'false' ? false : true,
              delete: domainEnv.REACT_APP_FINE_TUNINGS_DELETE === 'false' ? false : true,
            },
          },
        },
      },
      toolkit: domainEnv.REACT_APP_TOOLKIT === 'false' ? false : true,
      datasource: domainEnv.REACT_APP_DATASOURCE === 'false' ? false : true,
      discovery: domainEnv.REACT_APP_DISCOVERY === 'false' ? false : true,
      session: domainEnv.REACT_APP_SESSION === 'false' ? false : true,
      schedule: domainEnv.REACT_APP_SCHEDULE === 'false' ? false : true,
      integration: domainEnv.REACT_APP_INTEGRATION === 'false' ? false : true,
      contact: domainEnv.REACT_APP_CONTACT === 'false' ? false : true,
      group: domainEnv.REACT_APP_GROUP === 'false' ? false : true,
      'external-links': domainEnv.REACT_APP_EXTERNAL_LINKS === 'false' ? false : true,
    },
  }

  return { config }
}
