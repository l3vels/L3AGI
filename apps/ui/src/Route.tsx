import { Navigate, Route as Router, Routes } from 'react-router-dom'
import About from './pages/About'

import Channels from './pages/Channels'
import Create from './pages/Create'

import Home from './pages/Home'
import Saved from './pages/Saved'
import Settings from './pages/Settings'
import Teams from './pages/Teams'

import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  TwoFAuthentication,
  GithubLogin,
} from 'pages/Auth'
import ApiKeys from 'pages/ApiKeys/ApiKeys'

import MainComponent from 'pages/MainComponent'
import ChangePassword from 'pages/ChangePassword'
import Account from 'pages/Account'
import { AuthContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'

import { PublicRoute } from 'routes'

import UpdatePassword from 'pages/UpdatePassword'

import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from 'styles/theme'
import { WelcomeLoader } from 'components/Loader/WelcomeLoader'
import { CheatCode } from 'pages/Auth/Register/CheatCode'

import Log from 'pages/Log/Log'

import { useHotkeys } from 'react-hotkeys-hook'

import DeleteConfirmationModal from 'modals/DeleteConfirmationModal'

import MainRouteLayout from 'routes/MainRouteLayout'

import DevelopersRouteLayout from 'routes/DevelopersRouteLayout'
import CommandMenu from 'components/CommandMenu/CommandMenu'
import RootLayout from 'routes/RootLayout'

import CreateAgentModal from 'modals/CreateAgentModal'
import EditAgentModal from 'modals/EditAgentModal'
import CreateDatasourceModal from 'modals/CreateDatasourceModal'
import EditDatasourceModal from 'modals/EditDatasourceModal'
import Datasource from 'pages/Datasource'
import TeamOfAgents from 'pages/TeamOfAgents'

import Discover from 'pages/Discover'
import AgentView from 'pages/Agents/AgentView'

import CreateAgentForm from 'pages/Agents/AgentForm/CreateAgentForm'
import EditAgentForm from 'pages/Agents/AgentForm/EditAgentForm'
import CreateDatasourceForm from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'
import EditDatasourceForm from 'pages/Datasource/DatasourceForm/EditDatasourceForm'
import CreateTeamOfAgentsForm from 'pages/TeamOfAgents/TeamOfAgentsForm/CreateTeamOfAgentsForm'
import EditTeamOfAgentsForm from 'pages/TeamOfAgents/TeamOfAgentsForm/EditTeamOfAgentsForm'
import Toolkit from 'pages/Toolkit'
import ToolView from 'pages/Toolkit/ToolView'
import TeamOfAgentView from 'pages/TeamOfAgents/TeamOfAgentView'
import HomeRouteLayout from 'routes/HomeRouteLayout'
import LoginModal from 'modals/LoginModal'
import CreateAgentTemplate from 'pages/Agents/AgentForm/CreateAgentTempate'
import AgentViewModal from 'modals/AgentViewModal'
import TeamOfAgentViewModal from 'modals/TeamOfAgentViewModal'
import ChatHistory from 'modals/AIChatModal/components/ChatHistory'
import ChatHistoryRouteLayout from 'routes/ChatHistoryRouteLayout'
import SettingsModal from 'modals/SettingsModal'
import ToolkitModal from 'modals/ToolkitModal'
import ChatRouteLayout from 'routes/ChatRouteLayout'

import ClientChat from 'modals/AIChatModal/components/ClientChat'
import ChatLinkModal from 'modals/ChatLinkModal'

const Route = () => {
  const { user, loading } = useContext(AuthContext)
  const [cmdkOpen, setCmdkOpen] = useState(false)
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme || 'dark'
  })

  useHotkeys('ctrl+enter, meta+k', event => {
    event.preventDefault()
    setCmdkOpen(true)
    return false
  })

  useEffect(() => {
    const currentThemeName = localStorage.getItem('theme')

    if (currentThemeName && currentThemeName !== theme) {
      setTheme(currentThemeName)
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  if (loading) return <WelcomeLoader />

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Routes>
        <>
          <Router element={<RootLayout />}>
            <Router element={<HomeRouteLayout />}>
              <Router path='/' element={<Home />} key={document.location.href} />
            </Router>

            <Router element={<MainRouteLayout />}>
              <Router path='/discover' element={<Discover />} key={document.location.href} />

              {/* <Router path='agents' element={<Agents />} key={document.location.href} /> */}
              {/* <Router path='datasources' element={<Datasource />} key={document.location.href} /> */}
              {/* <Router path='tools' element={<Toolkit />} key={document.location.href} /> */}

              <Router path='teams' element={<Teams />} key={document.location.href} />
              <Router path='channels' element={<Channels />} key={document.location.href} />

              {/* <Router path='developers' element={<Navigate to={'api-keys'} />} /> */}

              {/* // disabled routes  */}
              <Router path='saved' element={<Saved />} key={document.location.href} />
              <Router path='create' element={<Create />} key={document.location.href} />
              <Router
                path='change-password'
                element={<ChangePassword />}
                key={document.location.href}
              />
              <Router path='account' element={<Account />} key={document.location.href} />
              <Router path='api-keys' element={<ApiKeys />} key={document.location.href} />
              <Router path='settings' element={<Settings />} key={document.location.href} />
              <Router path='about' element={<About />} key={document.location.href} />
              <Router path='logs' element={<Log />} key={document.location.href} />
              <Router path='log/:id' element={<Log />} key={document.location.href} />
              <Router path='successful/:id' element={<Log />} key={document.location.href} />
              <Router path={'failed/:id'} element={<Log />} key={document.location.href} />
              {/* <Router path='webhook' element={<Webhook />} key={document.location.href} /> */}
            </Router>

            <Router path={'chat'} element={<ChatRouteLayout />} key={document.location.href} />
            {/* <Router index element={<AIChat />} key={document.location.href} />
            </Router> */}

            <Router
              path={'/chatHistory'}
              element={<ChatHistoryRouteLayout />}
              key={document.location.href}
            >
              <Router index element={<ChatHistory />} key={document.location.href} />
            </Router>

            <Router
              path={'/chat/client'}
              element={<ChatRouteLayout />}
              key={document.location.href}
            />
            {/* <Router index element={<ClientChat />} key={document.location.href} />
            </Router> */}

            <Router path={'agents'} element={<ChatRouteLayout />} key={document.location.href}>
              {/* <Router index element={<div />} key={document.location.href} /> */}
              <Router path={':agentId'} element={<AgentView />} key={document.location.href} />
              <Router
                path={'create-agent-template'}
                element={<CreateAgentTemplate />}
                key={document.location.href}
              />
              <Router
                path={'create-agent'}
                element={<CreateAgentForm />}
                key={document.location.href}
              />
              <Router
                path={':agentId/edit-agent'}
                element={<EditAgentForm />}
                key={document.location.href}
              />
            </Router>

            <Router path={'datasources'} element={<MainRouteLayout />} key={document.location.href}>
              <Router index element={<Datasource />} key={document.location.href} />
              <Router path={':datasourceId'} element={<AgentView />} key={document.location.href} />
              <Router
                path={'create-datasource'}
                element={<CreateDatasourceForm />}
                key={document.location.href}
              />
              <Router
                path={':datasourceId/edit-datasource'}
                element={<EditDatasourceForm />}
                key={document.location.href}
              />
            </Router>
            <Router
              path={'team-of-agents'}
              element={<ChatRouteLayout />}
              key={document.location.href}
            >
              <Router index element={<TeamOfAgents />} key={document.location.href} />
              <Router path={':teamId'} element={<TeamOfAgentView />} key={document.location.href} />
              <Router
                path={'create-team'}
                element={<CreateTeamOfAgentsForm />}
                key={document.location.href}
              />
              <Router
                path={':teamId/edit-team'}
                element={<EditTeamOfAgentsForm />}
                key={document.location.href}
              />
            </Router>

            <Router path={'toolkits'} element={<MainRouteLayout />} key={document.location.href}>
              <Router index element={<Toolkit />} key={document.location.href} />
              <Router path={':slug'} element={<ToolView />} key={document.location.href} />
            </Router>

            <Router path={'developers'} element={<DevelopersRouteLayout />}>
              <Router index element={<ApiKeys />} key={document.location.href} />
              <Router path={'logs'} element={<Log />} key={document.location.href} />
              <Router path={'log/:id'} element={<Log />} key={document.location.href} />
              <Router path={'successful/:id'} element={<Log />} key={document.location.href} />
              <Router path={'failed/:id'} element={<Log />} key={document.location.href} />
              {/* <Router path={'docs'} element={<Doc />} /> */}
            </Router>

            <Router path='*' element={<MainComponent value={'page not found'} />} />
          </Router>
        </>
        <Router element={<PublicRoute />}>
          {/* <Router path='/login' element={<Login />} /> */}
          <Router path='/github-login' element={<GithubLogin />} />
          {/* <Router path='/register' element={<Register />} /> */}
          <Router path='/forgot-password' element={<ForgotPassword />} />
          <Router path='/login/:id' element={<Login />} />
          <Router path='/reset-password/:id' element={<ResetPassword />} />
          <Router path='/authentication/:id' element={<TwoFAuthentication />} />
          <Router path='/login/update-password' element={<UpdatePassword />} />
          <Router path='/cheat-code' element={<CheatCode />} />
          {/* <Router path='/chat/history' element={<AIChat isHistory />} /> */}
        </Router>
      </Routes>

      <DeleteConfirmationModal />
      <CreateAgentModal />
      <EditAgentModal />
      <CreateDatasourceModal />
      <EditDatasourceModal />
      <LoginModal />
      <AgentViewModal />
      <TeamOfAgentViewModal />
      <SettingsModal />
      <ToolkitModal />
      <ChatLinkModal />
      <CommandMenu
        open={cmdkOpen}
        setCmdkOpen={setCmdkOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* <NotificationsModal /> */}
    </ThemeProvider>
  )
}

export default Route
