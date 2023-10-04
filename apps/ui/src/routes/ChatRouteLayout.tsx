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

const ChatRouteLayout = () => {
  const { expand } = useContext(LayoutContext)

  const { user } = React.useContext(AuthContext)

  const { setToast } = useContext(ToastContext)

  const [showChats, setShowChats] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  const outlet = useOutlet()
  const { agentsData } = useAgents()
  const { teamOfAgents: teamOfAgentsArray } = useTeamOfAgents()
  const { data: chatsData, refetch: refetchChat } = useChatsService()

  const navigate = useNavigate()

  const { openModal, closeModal } = useModal()

  const location = useLocation()

  const urlParams = new URLSearchParams(location.search)
  const params = useParams()

  const agentId = urlParams.get('agent') || params.agentId
  const teamId = urlParams.get('team') || params.teamId
  const chatId = urlParams.get('chat')

  const { deleteChat } = useDeleteChatService()

  const { data: agentById } = useAgentByIdService({ id: agentId || '' })
  const { data: teamOfAgents } = useTeamOfAgentsByIdService({ id: teamId || '' })
  const { data: chatById } = useChatByIdService({ id: chatId || '' })

  // useEffect(() => {
  //   const handleResize = () => {
  //     // Check the window width and update the state accordingly
  //     onChangeLayout(window.innerWidth <= 1400) // Adjust the breakpoint as needed
  //   }

  //   // Set the initial state on component mount
  //   handleResize()

  //   // Add a resize event listener to handle changes
  //   window.addEventListener('resize', handleResize)

  //   // Remove the event listener on component unmount to avoid memory leaks
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  if (!user && !chatId) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      <StyledContainer>
        {expand && !showChats && (
          <StyledShowButton
            onClick={() => setShowChats(true)}
            onMouseEnter={() => setShowChats(true)}
          />
        )}
        {expand && !showInfo && (
          <StyledShowButton
            isRight
            onClick={() => setShowInfo(true)}
            onMouseEnter={() => setShowInfo(true)}
          />
        )}
        <StyledLeftColumn isHidden={expand && !showChats} onMouseLeave={() => setShowChats(false)}>
          {user && (
            <>
              <ListHeader title='Team' onAddClick={() => navigate('/team-of-agents/create-team')} />

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

                return (
                  <TeamChatCard
                    key={index}
                    onClick={() => navigate(`/chat?team=${teamOfAgents.id}`)}
                    onViewClick={handleView}
                    onEditClick={isCreator ? handleEdit : undefined}
                    picked={teamId === teamOfAgents.id}
                    team={teamOfAgents}
                    agents={team_agents}
                  />
                )
              })}
            </>
          )}

          {user && (
            <>
              <ListHeader
                title='Agent'
                onAddClick={() => navigate('/agents/create-agent-template')}
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

                return (
                  <AgentChatCard
                    key={index}
                    onClick={() => navigate(`/chat?agent=${agent.id}`)}
                    onViewClick={handleView}
                    onEditClick={isCreator ? handleEdit : undefined}
                    picked={agentId === agent.id}
                    agent={agent}
                  />
                )
              })}
            </>
          )}

          {user && chatsData?.length > 0 && (
            <>
              <ListHeader title='Channel' />

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
                    onClick={() => navigate(`/chat/client?chat=${id}`)}
                    onDeleteClick={deleteChatHandler}
                  />
                )
              })}
            </>
          )}
        </StyledLeftColumn>

        <StyledMainWrapper>
          {location.pathname.includes('/chat') ? (
            <StyledChatWrapper isHidden={false}>
              <AIChat />
            </StyledChatWrapper>
          ) : (
            <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
          )}
        </StyledMainWrapper>

        <StyledRightColumn
          isHidden={!showInfo && (expand || !location.pathname.includes('/chat'))}
          onMouseLeave={() => setShowInfo(false)}
        >
          <ChatMembers agentById={agentById || chatById?.agent} teamOfAgents={teamOfAgents} />
        </StyledRightColumn>
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
`
const StyledLeftColumn = styled.div<{ right?: boolean; isHidden?: boolean }>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 20px 10px;
  padding-left: 100px;

  height: 100%;
  min-width: 500px;

  max-height: calc(100vh - 185px);

  margin-top: 30px;

  transition: margin-left 0.3s ease-in-out;

  ${props =>
    props.isHidden &&
    css`
      margin-left: -500px;
      overflow: hidden;
      cursor: pointer;
      :hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `}
`
const StyledRightColumn = styled.div<{ isHidden?: boolean }>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  height: 100%;
  min-width: 500px;

  max-height: calc(100vh - 185px);

  margin-top: 30px;
  padding-right: 10px;
  transition: margin-right 0.3s ease-in-out;

  ${props =>
    props.isHidden &&
    css`
      margin-right: -500px;
      overflow: hidden;
      cursor: pointer;
      :hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `}
`

const StyledMainWrapper = styled.div`
  margin-top: 30px;

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
  width: calc(100% - 0px);
  padding: 0 30px;

  max-width: 1500px;
`
const StyledShowButton = styled.div<{ isRight?: boolean }>`
  height: 100%;
  width: 9%;

  cursor: pointer;

  position: absolute;
  z-index: 10000;
  left: 0;
  max-height: calc(100vh - 185px);

  ${props =>
    props.isRight &&
    css`
      right: 0;
      margin-left: auto;
    `}
`
