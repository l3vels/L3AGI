import React from 'react'
import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext } from 'contexts'

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

const ChatRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()
  const { agentsData } = useAgents()

  const { teamOfAgents: teamOfAgentsArray } = useTeamOfAgents()

  const navigate = useNavigate()

  const { openModal } = useModal()

  const location = useLocation()

  const urlParams = new URLSearchParams(location.search)
  const params = useParams()

  const agentId = urlParams.get('agent') || params.agentId
  const teamId = urlParams.get('team') || params.teamId

  if (!user) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      <StyledContainer>
        <StyledList>
          <ListHeader title='Team' onAddClick={() => navigate('/team-of-agents/create-team')} />

          {teamOfAgentsArray?.map((teamOfAgents: any, index: number) => {
            const { team_agents } = teamOfAgents

            const isCreator = user?.id === teamOfAgents?.created_by

            const handleView = (event: any) => {
              event.stopPropagation()

              openModal({
                name: 'team-of-agent-view-modal',
                data: { teamOfAgents: teamOfAgents },
              })
            }

            const handleEdit = (event: any) => {
              event.stopPropagation()
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

          <ListHeader title='Agent' onAddClick={() => navigate('/agents/create-agent-template')} />

          {agentsData?.map((agentObj: any, index: number) => {
            const { agent } = agentObj

            const isCreator = user?.id === agent?.created_by

            const handleEdit = (event: any) => {
              event.stopPropagation()
              navigate(`/agents/${agent?.id}/edit-agent`)
            }

            const handleView = (event: any) => {
              event.stopPropagation()

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
        </StyledList>
        <StyledMainWrapper>
          <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
          <StyledChatWrapper isHidden={location.pathname !== '/chat'}>
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
