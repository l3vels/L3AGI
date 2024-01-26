import React from 'react'
import { Navigate, useLocation, useNavigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import styled, { css } from 'styled-components'
import AIChat from 'modals/AIChatModal/AIChat'
import { useAgents } from 'pages/Agents/useAgents'
import AgentCard from 'pages/Agents/AgentCard'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import { useModal } from 'hooks'
import IconButton from 'share-ui/components/IconButton/IconButton'

import Edit from 'share-ui/components/Icon/Icons/components/Edit'
import EyeOpen from 'share-ui/components/Icon/Icons/components/EyeOpen'
import Add from 'share-ui/components/Icon/Icons/components/Add'
import { useTeamOfAgents } from 'pages/TeamOfAgents/useTeamOfAgents'
import { StyledSectionTitle } from 'pages/Home/homeStyle.css'
import Typography from 'share-ui/components/typography/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import {
  StyledEditIcon,
  StyledEyeOpenIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

const AgentRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()
  const { agentsData, deleteAgentHandler } = useAgents()

  const { teamOfAgents: teamOfAgentsArray, deleteTeamOfAgentsHandler } = useTeamOfAgents()

  const navigate = useNavigate()

  const { openModal } = useModal()

  const location = useLocation()

  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent')
  const teamId = urlParams.get('team')

  if (!user) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <StyledContainer>
        <StyledList>
          <StyledListHeader>
            <TypographySecondary
              value={'Teams'}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <IconButton
              icon={() => (
                <StyledIconWrapper>
                  <StyledAddIcon size={30} />
                </StyledIconWrapper>
              )}
              onClick={() => navigate('/team-of-agents/create-team')}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
              ariaLabel='Add Team'
            />
          </StyledListHeader>

          {teamOfAgentsArray?.map((teamOfAgents: any, index: number) => {
            const { team_agents } = teamOfAgents
            return (
              <StyledAgentWrapper
                key={index}
                onClick={() => navigate(`/agents?team=${teamOfAgents.id}`)}
                picked={teamId === teamOfAgents.id}
              >
                <AvatarGenerator name={teamOfAgents?.name} size={30} avatar={teamOfAgents.avatar} />
                <MemberText name={teamOfAgents?.name} role={teamOfAgents.team_type} />

                <StyledTeamAgents>
                  {team_agents?.map((agent: any, index: number) => {
                    return (
                      <AvatarGenerator
                        key={index}
                        name={agent?.agent?.name}
                        avatar={agent?.agent?.avatar}
                        size={20}
                      />
                    )
                  })}
                </StyledTeamAgents>

                <StyledIconButtonWrapper className='hiddenButton'>
                  <IconButton
                    // onClick={() =>
                    //   openModal({
                    //     name: 'agent-view-modal',
                    //     data: {
                    //       agent: agentObj,
                    //     },
                    //   })
                    // }
                    icon={() => (
                      <StyledIconWrapper>
                        <StyledEyeOpenIcon />
                      </StyledIconWrapper>
                    )}
                    size={IconButton.sizes?.SMALL}
                    kind={IconButton.kinds?.TERTIARY}
                    // ariaLabel='View'
                  />

                  {/* {isCreator && (
                    <IconButton
                      onClick={handleEdit}
                      icon={() => <Edit />}
                      size={IconButton.sizes?.SMALL}
                      kind={IconButton.kinds?.TERTIARY}
                      // ariaLabel='Edit'
                    />
                  )} */}
                </StyledIconButtonWrapper>
              </StyledAgentWrapper>
            )
          })}

          <StyledListHeader>
            <TypographySecondary
              value={'Agents'}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <IconButton
              icon={() => (
                <StyledIconWrapper>
                  <StyledAddIcon size={30} />
                </StyledIconWrapper>
              )}
              onClick={() => navigate('/agents/create-agent-template')}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
              ariaLabel='Add Agent'
            />
          </StyledListHeader>

          {agentsData?.map((agentObj: any, index: number) => {
            const { agent } = agentObj

            const isCreator = user?.id === agent?.created_by

            const handleEdit = () => {
              navigate(`/agents/${agent?.id}/edit-agent`)
            }

            return (
              <>
                {/* <AgentCard
                  key={index}
                  name={agent.name}
                  description={agent.description}
                  onEditClick={() => navigate(`/agents/${agent.id}/edit-agent`)}
                  onDeleteClick={() => deleteAgentHandler(agent.id)}
                  onViewClick={() => navigate(`/agents/${agent.id}`)}
                  headerTag={agent.role}
                  onChatClick={() => navigate(`/chat?agent=${agent.id}`)}
                  creator={agent.creator}
                  avatar={agent.avatar}
                /> */}
                <StyledAgentWrapper
                  onClick={() => navigate(`/agents?agent=${agent.id}`)}
                  picked={agentId === agent.id}
                >
                  <AvatarGenerator name={agent?.name} size={30} avatar={agent.avatar} />
                  <MemberText name={agent?.name} role={agent?.role} />

                  <StyledIconButtonWrapper className='hiddenButton'>
                    <IconButton
                      onClick={() =>
                        openModal({
                          name: 'agent-view-modal',
                          data: {
                            agent: agentObj,
                          },
                        })
                      }
                      icon={() => (
                        <StyledIconWrapper>
                          <StyledEyeOpenIcon />
                        </StyledIconWrapper>
                      )}
                      size={IconButton.sizes?.SMALL}
                      kind={IconButton.kinds?.TERTIARY}
                      // ariaLabel='View'
                    />

                    {isCreator && (
                      <IconButton
                        onClick={handleEdit}
                        icon={() => <StyledEditIcon />}
                        size={IconButton.sizes?.SMALL}
                        kind={IconButton.kinds?.TERTIARY}
                        // ariaLabel='Edit'
                      />
                    )}
                  </StyledIconButtonWrapper>
                </StyledAgentWrapper>
              </>
            )
          })}
        </StyledList>
        <StyledMainWrapper>
          <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
          <StyledChatWrapper isHidden={location.pathname !== ('/agents' || '/team-of-agents')}>
            <AIChat />
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default AgentRouteLayout

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
  max-width: 350px;

  max-height: calc(100vh - 260px);

  margin-top: 30px;
`
const StyledAgentWrapper = styled.div<{ picked: boolean }>`
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 5px;

  padding: 10px;
  width: 300px;

  /* background: rgba(255, 255, 255, 0.1); */

  padding-left: 15px;
  border-radius: 10px;

  :hover {
    background: rgba(0, 0, 0, 0.1);
    .hiddenButton {
      opacity: 1;
    }
  }

  ${props =>
    props.picked &&
    css`
      background: rgba(250, 250, 250, 0.3);
      :hover {
        background: rgba(250, 250, 250, 0.3);
      }
    `}
`

const StyledIconWrapper = styled.div`
  color: transparent;
`

const StyledIconButtonWrapper = styled.div`
  margin-left: auto;

  opacity: 0;
  /* transition: opacity 300ms; */

  display: flex;
  align-items: center;
`
const StyledListHeader = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  width: 100%;
`
const StyledTeamAgents = styled.div`
  /* height: 100%; */
  display: flex;
`
const StyledMainWrapper = styled.div`
  margin-top: 30px;
  max-width: 1500px;
  width: 100%;
`
const StyledChatWrapper = styled.div<{ isHidden: boolean }>`
  /* max-width: 1400px; */
  margin-left: 100px;
  height: 100%;
  width: calc(100% - 100px);

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
