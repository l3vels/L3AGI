import React, { useEffect } from 'react'

// import { IUser } from 'interfaces'
import { useAccountService, useUserService } from 'services'
import { AuthContext } from 'contexts'
import WelcomeLoader from 'components/Loader/WelcomeLoader'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { useTranslation } from 'react-i18next'

import { useDomainConfig } from 'utils/useDomainConfig'
// import { useLocation } from 'react-router-dom'

// type AuthProviderProps = {
//   children: (user: any) => React.ReactElement
// }

const AuthProvider = ({ children }: any) => {
  const { t, i18n } = useTranslation()
  const { getDomainConfig } = useDomainConfig()
  const { moduleNames } = useGetAccountModule()

  const { data: user, loading } = useUserService({})
  // const {i18n} = useTranslation()
  const { data: account } = useAccountService()

  const isAuthenticated = Boolean(user?.id)

  const contextValue = {
    user,
    loading,
    isAuthenticated,
    account,
  }

  const {
    welcome,
    agent,
    team,
    chat,
    home,
    datasource,
    discovery,
    models,
    schedule,
    toolkits,
    integration,
  } = moduleNames

  const domainTitle = getDomainConfig('title')
  const domainWelcomeMessage = getDomainConfig('welcome_message')

  const handleTranslation = (value: string, newName: string) => {
    i18n.addResource('en', 'translation', value, newName)
  }
  if (domainTitle) handleTranslation('l3agi', domainTitle)
  if (domainWelcomeMessage) handleTranslation('welcome-l3agi', domainWelcomeMessage)

  useEffect(() => {
    // Update the translation dynamically
    if (welcome) handleTranslation('welcome-message', welcome)
    if (home) handleTranslation('home', home)
    if (chat) handleTranslation('chat', chat)
    if (agent) handleTranslation('agent', agent)
    if (team) handleTranslation('team', team)
    if (datasource) handleTranslation('datasource', datasource)
    if (toolkits) handleTranslation('toolkit', toolkits)
    if (models) handleTranslation('model', models)
    if (discovery) handleTranslation('discovery', discovery)
    if (schedule) handleTranslation('schedule', schedule)
    if (integration) handleTranslation('integration', integration)
  }, [moduleNames])

  if (loading) {
    return <WelcomeLoader />
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
