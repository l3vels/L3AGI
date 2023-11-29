import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, LayoutContext, ToastContext } from 'contexts'

import { Header } from 'components/Layout'
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
  const { data: chatsData, refetch: refetchChat } = useChatsService()

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

  if (!user && !chatId) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header isPublicRoute={!user} hideButtons={!user && chatId ? true : false} />
      <StyledContainer>
        {expand && !showChats && location.pathname.includes('/chat') && (
          <StyledShowButton
            onClick={() => setShowChats(true)}
            onMouseEnter={() => setShowChats(true)}
          />
        )}
        {expand && !showInfo && location.pathname.includes('/chat') && (
          <StyledShowButton
            isSmallScreen={isSmallScreen}
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

        {user && (
          <StyledLeftColumn
            isSmallScreen={isSmallScreen && location.pathname.includes('/chat')}
            isHidden={expand && !showChats && location.pathname.includes('/chat')}
          >
            {teamModule?.list && (
              <>
                <ListHeader
                  title={t('team')}
                  onAddClick={
                    teamModule?.create ? () => navigate('/team-of-agents/create-team') : undefined
                  }
                />

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
                    navigate(`/team-of-agents/${teamOfAgents.id}/edit-team`)
                  }

                  const handleDelete = () => {
                    deleteTeamOfAgentsHandler(teamOfAgents.id)
                  }

                  return (
                    <TeamChatCard
                      key={index}
                      onClick={() => navigate(`/chat?team=${teamOfAgents.id}`)}
                      onViewClick={handleView}
                      onEditClick={teamModule?.edit && isCreator && handleEdit}
                      onDeleteClick={teamModule?.delete && isCreator && handleDelete}
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
                  onAddClick={
                    agentModule.create ? () => navigate('/agents/create-agent-template') : undefined
                  }
                />

                {agentsData?.map((agentObj: any, index: number) => {
                  const { agent } = agentObj

                  const isCreator = user?.id === agent?.created_by

                  const handleEdit = () => {
                    navigate(`/agents/${agent?.id}/edit-agent`)
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
                      onClick={() => navigate(`/chat?agent=${agent.id}`)}
                      onViewClick={handleView}
                      onEditClick={agentModule?.edit && isCreator && handleEdit}
                      onDeleteClick={agentModule?.delete && isCreator && handleDelete}
                      picked={agentId === agent.id}
                      agent={agent}
                    />
                  )
                })}
              </>
            )}

            {sessionModule?.list && chatsData?.length > 0 && (
              <>
                <ListHeader title={t('session')} />

                {chatsData?.map((chat: any) => {
                  const { agent, name, id } = chat

                  const deleteChatHandler = () => {
                    openModal({
                      name: 'delete-confirmation-modal',
                      data: {
                        deleteItem: async () => {
                          try {
                            await deleteChat(id)
                            await refetchChat()
                            navigate('/chat')
                            setToast({
                              message: 'Chat was deleted!',
                              type: 'positive',
                              open: true,
                            })
                          } catch (e) {
                            setToast({
                              message: 'Failed to delete Chat!',
                              type: 'negative',
                              open: true,
                            })
                          }
                          closeModal('delete-confirmation-modal')
                        },
                        label: 'Delete Chat?',
                      },
                    })
                  }

                  return (
                    <CustomerChatCard
                      key={id}
                      picked={id === chatId}
                      name={name}
                      subTitle={agent.agent.name}
                      onClick={() => navigate(`/chat/session?chat=${id}`)}
                      onDeleteClick={deleteChatHandler}
                    />
                  )
                })}
              </>
            )}
          </StyledLeftColumn>
        )}

        <StyledMainWrapper>
          {location.pathname.includes('/chat') ? (
            <StyledChatWrapper isHidden={false}>
              <AIChat />
            </StyledChatWrapper>
          ) : (
            <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
          )}
        </StyledMainWrapper>

        {user && (
          <StyledRightColumn
            isHidden={(!showInfo && expand) || !location.pathname.includes('/chat')}
          >
            <ChatMembers
              agentById={agentById || chatById?.agent}
              teamOfAgents={teamOfAgents}
              voiceUrl={chatById?.voice_url}
              call={call}
            />
          </StyledRightColumn>
        )}
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default ChatRouteLayout

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;

  position: relative;
`
const StyledLeftColumn = styled.div<{
  isHidden?: boolean
  isSmallScreen: boolean
}>`
  /* background: ${({ theme }) => theme.body.cardBgColor}; */
  border-right: ${({ theme }) =>
    location.pathname.includes('/chat') ? theme.body.secondaryBorder : 'none'};
  /* border-radius: 10px; */

  position: absolute;
  left: 0;
  z-index: 10000;

  backdrop-filter: blur(100px);

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 20px 10px;
  padding-top: 0px;
  padding-left: 120px;

  height: 100%;
  min-width: 475px;

  max-height: calc(100vh - 185px);

  transition: margin-left 0.3s ease-in-out;

  ${props =>
    props.isHidden &&
    css`
      margin-left: -475px;
      overflow: hidden;
      cursor: pointer;
    `}
  ${props =>
    props.isSmallScreen &&
    css`
      margin-left: 0;
      overflow: auto;
      cursor: pointer;
      position: static;
    `}
`
const StyledRightColumn = styled.div<{ isHidden: boolean }>`
  position: absolute;
  right: 0;
  z-index: 10000;

  backdrop-filter: blur(100px);

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  height: 100%;
  min-width: 320px;

  max-height: calc(100vh - 230px);

  margin-top: 30px;
  padding-right: 10px;
  transition: margin-right 0.3s ease-in-out;

  ${props =>
    props.isHidden &&
    css`
      margin-right: -320px;
      overflow: hidden;
      cursor: pointer;
    `}
`

const StyledMainWrapper = styled.div`
  /* margin-top: 30px; */

  display: flex;
  justify-content: center;
  width: 100%;
`
const StyledChatWrapper = styled.div<{ isHidden: boolean }>`
  height: 100%;
  width: 100%;

  ${props =>
    props.isHidden &&
    css`
      display: none;
    `}
`
const StyledOutletWrapper = styled.div`
  width: calc(100% - 500px);
  padding: 0 30px;
  margin-left: 450px;
  max-width: 1500px;
`
const StyledShowButton = styled.div<{ isRight?: boolean; isSmallScreen?: boolean }>`
  height: 100vh;
  width: calc(30% - 120px);

  cursor: pointer;

  position: absolute;
  z-index: 10000;
  left: 0;

  ${props =>
    props.isRight &&
    css`
      right: 0;
      margin-left: auto;
    `}
  ${props =>
    props.isSmallScreen &&
    css`
      width: calc(15% - 150px);
    `}
`
const StyledMiddleArea = styled.div`
  height: 100%;
  width: calc(30% + 200px);

  cursor: pointer;

  position: absolute;
  z-index: 10000;
  /* left: 0; */
`
