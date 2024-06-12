import { Route as Router, Routes } from 'react-router-dom'
import About from './pages/About'

import Sessions from './pages/Sessions/Session'
import Create from './pages/Create'

import Home from './pages/Home'
import Saved from './pages/Saved'
import Settings from './pages/Settings'
import Teams from './pages/Teams'

import {
  ForgotPassword,
  Login,
  // Register,
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
import ToolView from 'pages/Toolkit/ToolView'
import Models from 'pages/Models'
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

// import ClientChat from 'modals/AIChatModal/components/ClientChat'
import ChatLinkModal from 'modals/ChatLinkModal'
import Schedule from 'pages/Schedule'
import CreateScheduleForm from 'pages/Schedule/ScheduleFrom/CreateScheduleForm'
import EditScheduleForm from 'pages/Schedule/ScheduleFrom/EditScheduleForm'
import Contact from 'plugins/contact/pages/Contact'
import CreateContactForm from 'plugins/contact/pages/Contact/ContactForm/CreateContactForm'
import EditContactForm from 'plugins/contact/pages/Contact/ContactForm/EditContactForm'
import CreateGroupForm from 'plugins/contact/pages/Group/GroupForm/CreateGroupForm'
import EditGroupForm from 'plugins/contact/pages/Group/GroupForm/EditGroupForm'
import ScheduleRunModal from 'modals/ScheduleRunModal'
import RunLogsModal from 'modals/RunLogsModal/RunLogsModal'
import CreateFineTuningForm from 'pages/Models/FineTuning/FineTuningForm/CreateFineTuningForm'
import EditFineTuningForm from 'pages/Models/FineTuning/FineTuningForm/EditFineTuningForm'
import CreateApiKeyForm from 'pages/ApiKeys/CreateApiKey/CreateApikeysForm'
import EditApiKeyForm from 'pages/ApiKeys/EditApiKey/EditApiKeysForm'
import Integrations from 'pages/Integrations'
import VoiceView from 'plugins/contact/pages/Voice/VoiceView'
import VoiceModal from 'modals/VoiceModal'
import ImportContacts from 'plugins/contact/pages/Contact/ImportContacts'
import CallLogsModal from 'modals/CallLogsModal'
import VideoModal from 'modals/VideoModal'
import ContactListModal from 'plugins/contact/pages/Modals/ContactListModal'
import CallProvider from 'plugins/contact/providers/CallProvider'
import CreateCampaignForm from 'plugins/contact/pages/Campaign/CampaignForm/CreateCampaignForm'
import EditCampaignForm from 'plugins/contact/pages/Campaign/CampaignForm/EditCampaignForm'
import TwilioPhoneNumberSidConfirmationModal from 'modals/TwilioPhoneNumberSidConfirmationModal'
import IntegrationListModal from 'modals/IntegrationListModal'
import DatasourceListModal from 'modals/DatasourceListModal'
import ModelDetails from 'pages/Models/components/ModelDetails'
import CreateCampaignModal from 'modals/CreateCampaignModal'
import EditCampaignModal from 'modals/EditCampaignModal'
import CreateScheduleModal from 'modals/CreateScheduleModal'
import EditScheduleModal from 'modals/EditScheduleModal'
import VoiceOptionsModal from 'modals/VoiceOptionsModal'
import LlmSettingsModal from 'modals/LlmSettingsModal'
import { InviteUsers, CreateUserAccess } from 'pages/InviteUsers'
import { Pods, PodsContent, MainPod, ChangeTemplateModal } from 'pages/Pods'
import Subnets from 'pages/Subnets'
import Billing from 'pages/Billing'

const Route = () => {
  const { loading } = useContext(AuthContext)
  const [cmdkOpen, setCmdkOpen] = useState(false)
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme || 'light'
  })

  // useHotkeys('ctrl+enter, meta+k', event => {
  //   event.preventDefault()
  //   setCmdkOpen(true)
  //   return false
  // })

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
      <CallProvider>
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
                path={'/chat/history'}
                element={<ChatHistoryRouteLayout />}
                key={document.location.href}
              >
                <Router index element={<ChatHistory />} key={document.location.href} />
              </Router>

              <Router
                path={'/chat/session'}
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

              <Router path={'datasources'} element={<Datasource />} key={document.location.href}>
                {/* <Router index element={<Datasource />} key={document.location.href} /> */}
                <Router
                  path={':datasourceId'}
                  element={<AgentView />}
                  key={document.location.href}
                />
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
                <Router
                  path={'create-group'}
                  element={<CreateGroupForm />}
                  key={document.location.href}
                />
                <Router
                  path={':groupId/edit-group'}
                  element={<EditGroupForm />}
                  key={document.location.href}
                />
                <Router
                  path={':groupId/edit-group/create-contact'}
                  element={<CreateContactForm />}
                  key={document.location.href}
                />
                <Router
                  path={':groupId/edit-group/:contactId/edit-contact'}
                  element={<EditContactForm />}
                  key={document.location.href}
                />
              </Router>
              <Router
                path={'team-of-agents'}
                element={<ChatRouteLayout />}
                key={document.location.href}
              >
                <Router index element={<TeamOfAgents />} key={document.location.href} />
                <Router
                  path={':teamId'}
                  element={<TeamOfAgentView />}
                  key={document.location.href}
                />
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

              <Router path={'integrations'} element={<Integrations />} key={document.location.href}>
                {/* <Router index element={<Integrations />} key={document.location.href} /> */}
                <Router
                  path={'toolkit/:slug'}
                  element={<ToolView />}
                  key={document.location.href}
                />
                <Router path={'voice/:slug'} element={<VoiceView />} key={document.location.href} />
              </Router>

              <Router path={'subnets'} element={<Subnets />} key={document.location.href}></Router>

              <Router path={'billing'} element={<Billing />} key={document.location.href}></Router>

              {/* <Router path={'toolkits'} element={<MainRouteLayout />} key={document.location.href}>
              <Router index element={<Toolkit />} key={document.location.href} />
              <Router path={':slug'} element={<ToolView />} key={document.location.href} />
            </Router> */}

              <Router path={'models'} element={<Models />} key={document.location.href}>
                <Router
                  path={'create-fine-tuning'}
                  element={<CreateFineTuningForm />}
                  key={document.location.href}
                />
                <Router
                  path={':fineTuningId/edit-fine-tuning'}
                  element={<EditFineTuningForm />}
                  key={document.location.href}
                />
                <Router path={':modelId'} element={<ModelDetails />} key={document.location.href} />
              </Router>

              <Router
                path={'sessions'}
                element={<MainRouteLayout expand />}
                key={document.location.href}
              >
                <Router index element={<Sessions />} key={document.location.href} />

                <Router
                  path={':agentId/edit-agent'}
                  element={<EditAgentForm />}
                  key={document.location.href}
                />
              </Router>

              <Router
                path={'schedules'}
                element={<MainRouteLayout expand />}
                key={document.location.href}
              >
                <Router index element={<Schedule />} key={document.location.href} />
                <Router
                  path={'create-schedule'}
                  element={<CreateScheduleForm />}
                  key={document.location.href}
                />
                <Router
                  path={'create-campaign'}
                  element={<CreateCampaignForm />}
                  key={document.location.href}
                />
                <Router
                  path={':scheduleId/edit-schedule'}
                  element={<EditScheduleForm />}
                  key={document.location.href}
                />
                <Router
                  path={':campaignId/edit-campaign'}
                  element={<EditCampaignForm />}
                  key={document.location.href}
                />
              </Router>

              <Router path={'contacts'} element={<MainRouteLayout />} key={document.location.href}>
                <Router index element={<Contact />} key={document.location.href} />
                <Router
                  path={'create-contact'}
                  element={<CreateContactForm />}
                  key={document.location.href}
                />
                <Router
                  path={'import-contacts'}
                  element={<ImportContacts />}
                  key={document.location.href}
                />
                <Router
                  path={':contactId/edit-contact'}
                  element={<EditContactForm />}
                  key={document.location.href}
                />

                <Router
                  path={'create-group'}
                  element={<CreateGroupForm />}
                  key={document.location.href}
                />
                <Router
                  path={':groupId/edit-group'}
                  element={<EditGroupForm />}
                  key={document.location.href}
                />
              </Router>

              <Router path='api-key' element={<MainRouteLayout />} key={document.location.href}>
                <Router index element={<ApiKeys />} key={document.location.href} />
                <Router
                  path={'create-api-key'}
                  element={<CreateApiKeyForm />}
                  key={document.location.href}
                />
                <Router
                  path={':apiKeyId/edit-api-key'}
                  element={<EditApiKeyForm />}
                  key={document.location.href}
                />
              </Router>

              <Router path='invite-user' element={<MainRouteLayout />} key={document.location.href}>
                <Router index element={<InviteUsers />} key={document.location.href} />
                <Router
                  path={'invite'}
                  element={<CreateUserAccess />}
                  key={document.location.href}
                />
                {/* <Router
                  path={':apiKeyId/edit-api-key'}
                  element={<EditApiKeyForm />}
                  key={document.location.href}
                /> */}
              </Router>

              <Router path='pods' element={<Pods />} key={document.location.href}>
                <Router index element={<MainPod />} key={document.location.href} />
                <Router
                  path={'create-pod'}
                  element={<PodsContent />}
                  key={document.location.href}
                />
                {/* <Router
                  path={':apiKeyId/edit-api-key'}
                  element={<EditApiKeyForm />}
                  key={document.location.href}
                /> */}
              </Router>
              {/* <Router path={'groups'} element={<MainRouteLayout />} key={document.location.href}>
              <Router index element={<Group />} key={document.location.href} />
            </Router> */}

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
        <LoginModal />
        <AgentViewModal />
        <TeamOfAgentViewModal />
        <SettingsModal />
        <ToolkitModal />
        <VoiceModal />
        <LlmSettingsModal />
        <ChatLinkModal />
        <ScheduleRunModal />
        <RunLogsModal />
        <CallLogsModal />
        <VideoModal />
        <ContactListModal />
        <IntegrationListModal />
        <DatasourceListModal />
        <CreateCampaignModal />
        <EditCampaignModal />
        <CreateScheduleModal />
        <EditScheduleModal />
        <VoiceOptionsModal />
        <TwilioPhoneNumberSidConfirmationModal />
        <ChangeTemplateModal />

        <CommandMenu
          open={cmdkOpen}
          setCmdkOpen={setCmdkOpen}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* <NotificationsModal /> */}
      </CallProvider>
    </ThemeProvider>
  )
}

export default Route
