import React, { useContext } from 'react'
import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'

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

const ChatRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const { setToast } = useContext(ToastContext)

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

  if (!user && !chatId) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      <StyledContainer>
        <StyledList>
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
        </StyledList>
        <StyledMainWrapper>
          <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
          <StyledChatWrapper isHidden={!location.pathname.includes('/chat')}>
            <AIChat />
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default ChatRouteLayout

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: 100px;
  /* gap: 100px; */
  /* margin-top: 30px; */
`
const StyledList = styled.div`
  /* background: rgba(255, 255, 255, 0.1); */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 20px;

  height: 100%;
  width: 100%;
  max-width: 400px;

  max-height: calc(100vh - 260px);

  margin-top: 30px;
`

const StyledMainWrapper = styled.div`
  margin-top: 30px;
  max-width: 1500px;
  width: 100%;
`
const StyledChatWrapper = styled.div<{ isHidden: boolean }>`
  /* max-width: 1400px; */
  margin-left: 50px;

  /* width: calc(100% - 450px;); */
  height: 100%;

  ${props =>
    props.isHidden &&
    css`
      display: none;
    `}
`
const StyledOutletWrapper = styled.div`
  width: 100%;
  padding: 0 30px;
`
