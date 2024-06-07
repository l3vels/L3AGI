import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, LayoutContext, ToastContext } from 'contexts'

import { StyledAppContainer } from '../components/Layout/LayoutStyle'

import styled, { css } from 'styled-components'
import AIChat from 'modals/AIChatModal/AIChat'
import { useAgents } from 'pages/Agents/useAgents'

import { useModal } from 'hooks'

import { useTeamOfAgents } from 'pages/TeamOfAgents/useTeamOfAgents'

import TeamChatCard from 'components/ChatCards/TeamChatCard'
import AgentChatCard from 'components/ChatCards/AgentChatCard'
import ListHeader from './components/ListHeader'
import { useChatsService } from 'services/chat/useChatsService'
import CustomerChatCard from 'components/ChatCards/CustomerChatCard'
import { useDeleteChatService } from 'services/chat/useDeleteChatService'
import ChatMembers from 'modals/AIChatModal/components/ChatMembers'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'
import { useChatByIdService } from 'services/chat/useChatByIdService'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { t } from 'i18next'
import { useCallByIdService } from 'plugins/contact/services/call/useCallByIdService'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import EditAgentForm from 'pages/Agents/AgentForm/EditAgentForm'
import EditTeamOfAgentsForm from 'pages/TeamOfAgents/TeamOfAgentsForm/EditTeamOfAgentsForm'

import CopyScript from 'pages/Agents/AgentForm/components/CopyScript'
import AgentVIewDetailBox, {
  StyledDetailsBox,
} from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import TypographyPrimary from 'components/Typography/Primary'
import Typography from 'share-ui/components/typography/Typography'
import TeamOfAgentsDetailsBox from 'pages/TeamOfAgents/components/TeamOfAgentsDetailsBox'
import Integrations from 'pages/Integrations'
import IntegrationDetails from './components/IntegrationsDetails'
import DatasourceDetails from './components/DatasourceDetails'
import VoiceIntegrationsDetails from './components/VoiceIntegrationsDetails'
import AgentSessionsTable from 'pages/Agents/AgentTables/AgentSessionsTable'
import AgentCampaignTable from 'pages/Agents/AgentTables/AgentCampaignTable'
import AgentScheduleTable from 'pages/Agents/AgentTables/AgentScheduleTable'
import CombinedCampaignTables from 'pages/Agents/AgentTables/CombinedCampaignTables'
import HeaderButtons from 'components/HeaderButtons'

const ChatRouteLayout = () => {
  const { getChatModules } = useGetAccountModule()
  const teamModule = getChatModules('team')
  const agentModule = getChatModules('agent')
  const sessionModule = getChatModules('session')

  const { expand } = useContext(LayoutContext)

  const { user } = React.useContext(AuthContext)

  const { setToast } = useContext(ToastContext)

  const [showChats, setShowChats] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const outlet = useOutlet()
  const { agentsData, deleteAgentHandler, agentsLoading } = useAgents()
  const {
    teamOfAgents: teamOfAgentsArray,
    deleteTeamOfAgentsHandler,
    teamsLoading,
  } = useTeamOfAgents()
  // const { data: chatsData, refetch: refetchChat } = useChatsService()

  const navigate = useNavigate()

  const { openModal, closeModal } = useModal()

  const location = useLocation()

  const urlParams = new URLSearchParams(location.search)
  const params = useParams()

  const agentId = urlParams.get('agent') || params.agentId
  const teamId = urlParams.get('team') || params.teamId
  const chatId = urlParams.get('chat') ?? undefined

  const { deleteChat } = useDeleteChatService()

  const { data: agentById } = useAgentByIdService({ id: agentId || '' })
  const { data: teamOfAgents } = useTeamOfAgentsByIdService({ id: teamId || '' })
  const { data: chatById } = useChatByIdService({ id: chatId || '' })

  const { data: call } = useCallByIdService({ id: chatId })

  useEffect(() => {
    if (!urlParams || !params) return

    if (
      (teamsLoading || agentsLoading) &&
      teamOfAgentsArray?.length === 0 &&
      agentsData?.length === 0
    )
      return

    if (location.pathname.includes('/chat') && !teamId && !chatId && !agentId) {
      if (teamOfAgentsArray?.length > 0) {
        return navigate(`/chat?team=${teamOfAgentsArray?.[0].id}`)
      } else if (agentsData?.length > 0) {
        return navigate(`/chat?agent=${agentsData?.[0].agent.id}`)
      } else {
        return navigate('/agents/create-agent-template')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsLoading, agentsLoading])

  useEffect(() => {
    if (!expand) {
      setShowChats(false)
      setShowInfo(false)
    }
  }, [expand])

  useEffect(() => {
    // Function to update the 'show' state based on screen width
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1600 && window.innerWidth > 1050)
    }

    // Initial setup
    handleResize()

    // Listen for window resize events
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const tabQuery = urlParams.get('tab')

  const defaultActiveTab = () => {
    if (tabQuery === 'playground') return 0
    if (tabQuery === 'sessions') return 1
    if (tabQuery === 'settings') return 2
    if (tabQuery === 'campaigns') return 3
  }

  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0)
  const handleTabClick = (tabId: number, tabName: string) => {
    setActiveTab(tabId)
    let queryParams = `tab=${tabName}`
    if (agentId) queryParams += `&agent=${agentId}`
    if (teamId) queryParams += `&team=${teamId}`
    if (chatId) queryParams += `&chat=${chatId}`
    navigate(`/chat?${queryParams}`)
  }

  useEffect(() => {
    if (!tabQuery) return setActiveTab(0)

    if (tabQuery === 'playground') return setActiveTab(0)
    if (tabQuery === 'sessions') return setActiveTab(1)
    if (tabQuery === 'settings') return setActiveTab(2)
    if (tabQuery === 'campaigns') return setActiveTab(3)
  }, [tabQuery])

  if (!user && !chatId) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <StyledContainer>
        {expand && !showChats && location.pathname.includes('/chat') && (
          <StyledShowButton
            onClick={() => setShowChats(true)}
            onMouseEnter={() => setShowChats(true)}
          />
        )}
        {expand && !showInfo && location.pathname.includes('/chat') && (
          <StyledShowButton
            isRight
            onClick={() => setShowInfo(true)}
            onMouseEnter={() => setShowInfo(true)}
          />
        )}

        {(showInfo || showChats) && (
          <StyledMiddleArea
            onMouseEnter={() => {
              setShowChats(false)
              setShowInfo(false)
            }}
          />
        )}
        <StyledMainWrapper>
          {user && (
            <StyledLeftColumn
              isSmallScreen={isSmallScreen && location.pathname.includes('/chat')}
              isHidden={expand && !showChats && location.pathname.includes('/chat')}
            >
              {teamOfAgentsArray?.length > 0 && teamModule?.list && (
                <>
                  <ListHeader
                    title={t('team')}
                    onAddClick={
                      teamModule?.create ? () => navigate('/team-of-agents/create-team') : undefined
                    }
                  />
                  <StyledHorizontalDivider />

                  {teamOfAgentsArray?.map((teamOfAgents: any, index: number) => {
                    const { team_agents } = teamOfAgents

                    const isCreator = user?.id === teamOfAgents?.created_by

                    const handleView = () => {
                      openModal({
                        name: 'team-of-agent-view-modal',
                        data: { teamOfAgents: teamOfAgents },
                      })
                    }

                    const handleEdit = () => {
                      navigate(`/chat?tab=settings&team=${teamOfAgents.id}`)
                    }

                    const handleDelete = () => {
                      deleteTeamOfAgentsHandler(teamOfAgents.id)
                    }

                    return (
                      <TeamChatCard
                        key={index}
                        onClick={() => {
                          navigate(`/chat?tab=playground&team=${teamOfAgents.id}`)
                        }}
                        // onViewClick={handleView}
                        onDeleteClick={teamModule?.delete && isCreator && handleDelete}
                        onEditClick={teamModule?.edit && isCreator && handleEdit}
                        picked={teamId === teamOfAgents.id}
                        team={teamOfAgents}
                        agents={team_agents}
                      />
                    )
                  })}
                </>
              )}

              {agentModule.list && (
                <>
                  <ListHeader
                    title={t('agent')}
                    multiOption={
                      agentModule.create
                        ? [
                            {
                              label: `Add Chat ${t('agent')}`,
                              function: () => navigate('/agents/create-agent-template?type=text'),
                            },
                            {
                              label: `Add Outbound Call ${t('agent')}`,
                              function: () =>
                                navigate('/agents/create-agent-template?type=outbound'),
                            },
                            {
                              label: `Add Inbound Call ${t('agent')}`,
                              function: () =>
                                navigate('/agents/create-agent-template?type=inbound'),
                            },
                            ...(teamOfAgentsArray?.length === 0
                              ? [
                                  {
                                    label: `${t('add-team')}`,
                                    function: () => navigate('/team-of-agents/create-team'),
                                  },
                                ]
                              : []),
                          ]
                        : undefined
                    }
                  />

                  {agentsData?.map((agentObj: any, index: number) => {
                    const { agent } = agentObj

                    const isCreator = user?.id === agent?.created_by

                    const handleEdit = () => {
                      navigate(`/chat?tab=settings&agent=${agent.id}`)
                    }

                    const handleView = () => {
                      openModal({
                        name: 'agent-view-modal',
                        data: {
                          agent: agentObj,
                        },
                      })
                    }

                    const handleDelete = () => {
                      deleteAgentHandler(agent.id)
                    }

                    return (
                      <AgentChatCard
                        key={index}
                        onClick={() => navigate(`/chat?tab=playground&agent=${agent.id}`)}
                        // onViewClick={handleView}
                        onDeleteClick={agentModule?.delete && isCreator && handleDelete}
                        onEditClick={agentModule?.edit && isCreator && handleEdit}
                        picked={agentId === agent.id}
                        agent={agent}
                      />
                    )
                  })}
                </>
              )}
            </StyledLeftColumn>
          )}

          {location.pathname.includes('/chat') ? (
            <StyledChatWrapper>
              <StyledFocusButtonWrapper>
                <HeaderButtons />
              </StyledFocusButtonWrapper>
              <TabList size='small' activeTabId={activeTab} noBorder>
                <Tab onClick={() => handleTabClick(0, 'playground')}>{t('playground')}</Tab>
                <Tab onClick={() => handleTabClick(1, 'sessions')} disabled={teamId ? true : false}>
                  {t('sessions')}
                </Tab>
                <Tab onClick={() => handleTabClick(3, 'settings')}>{t('settings')}</Tab>
                <Tab
                  onClick={() => handleTabClick(2, 'campaigns')}
                  disabled={teamId ? true : false}
                >
                  {t('More')}
                </Tab>
              </TabList>
              <StyledHorizontalDivider />
              <TabsContext activeTabId={activeTab}>
                <TabPanels noAnimation>
                  <TabPanel>
                    <AIChat />
                  </TabPanel>

                  <TabPanel>
                    {agentId && (
                      <StyledTableWrapper>
                        <AgentSessionsTable agentId={agentId} />
                      </StyledTableWrapper>
                    )}
                  </TabPanel>

                  <TabPanel>
                    {agentId && <EditAgentForm />}
                    {teamId && <EditTeamOfAgentsForm />}
                  </TabPanel>

                  <TabPanel>
                    {agentId && (
                      <StyledTableWrapper>
                        <CombinedCampaignTables agentId={agentId} />
                      </StyledTableWrapper>
                    )}
                  </TabPanel>
                </TabPanels>
              </TabsContext>
            </StyledChatWrapper>
          ) : (
            <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
          )}
        </StyledMainWrapper>

        {user && (
          <StyledRightColumn isHidden={!showInfo && expand}>
            {agentById && <AgentVIewDetailBox agentData={agentById} />}
            {teamOfAgents && <TeamOfAgentsDetailsBox teamData={teamOfAgents} />}

            <CopyScript />

            {agentById && <IntegrationDetails />}

            {agentById &&
              (agentById.agent.agent_type === 'text' || agentById.agent.agent_type === null) && (
                <DatasourceDetails />
              )}
          </StyledRightColumn>
        )}
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default ChatRouteLayout

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  overflow: hidden;

  position: relative;
  /* gap: 20px; */
`
export const StyledLeftColumn = styled.div<{
  isHidden?: boolean
  isSmallScreen?: boolean
  customWidth?: number
}>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding-top: 0px;

  height: 100%;
  min-width: ${({ customWidth }) => (customWidth ? `${customWidth}px` : '270px')};
  max-width: ${({ customWidth }) => (customWidth ? `${customWidth}px` : '270px')};

  transition: margin-left 0.3s ease-in-out;

  border-right: ${({ theme }) => theme.body.secondaryBorder};

  /* margin: 0 16px; */

  ${props =>
    props.isHidden &&
    css`
      margin-left: -270px;
      overflow: hidden;
      cursor: pointer;

      opacity: 0;
    `}
`
export const StyledRightColumn = styled.div<{ isHidden?: boolean }>`
  backdrop-filter: blur(100px);

  overflow-y: auto;

  display: flex;
  width: 400px;
  /* padding: 16px 16px 32px 16px; */
  flex-direction: column;
  align-items: center;
  gap: 16px;

  height: 100%;

  transition: margin-right 0.3s ease-in-out;

  ${props =>
    props.isHidden &&
    css`
      margin-right: -400px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0;
    `}
`

export const StyledMainWrapper = styled.div`
  /* margin-top: 30px; */
  padding: 16px;
  padding-right: 0;
  margin-right: 20px;
  border-radius: 16px;
  /* background: var(--background-background-tertiary, #f5f5f7); */
  background: ${({ theme }) => theme.body.componentsWrapperBg};

  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* max-width: 1400px; */
`
export const StyledChatWrapper = styled.div`
  height: 100%;
  width: 100%;
  /* max-width: 900px; */

  padding-left: 24px;

  display: flex;
  flex-direction: column;

  position: relative;
`
const StyledOutletWrapper = styled.div`
  width: 100%;
  /* padding: 0 30px; */

  /* max-width: 1500px; */
`
const StyledShowButton = styled.div<{ isRight?: boolean }>`
  height: 100vh;
  width: 100px;

  cursor: pointer;

  position: fixed;
  z-index: 10000;
  left: 0;

  ${props =>
    props.isRight &&
    css`
      right: 0;
      margin-left: auto;

      width: 30px;
    `}
`
const StyledMiddleArea = styled.div`
  height: 100%;
  width: calc(100% - 600px);

  cursor: pointer;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  /* left: 0; */
`

export const StyledHorizontalDivider = styled.div`
  border-bottom: ${({ theme }) => theme.body.secondaryBorder};

  width: calc(100% - 16px);

  /* margin: 8px 0; */
`
const StyledTableWrapper = styled.div`
  padding-right: 24px;
  height: calc(100% - 50px);
  padding-top: 15px;
`
const StyledFocusButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
`
