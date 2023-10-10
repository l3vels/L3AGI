import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { AuthContext } from 'contexts'
import { useModal } from 'hooks'
import AgentCard from 'pages/Agents/AgentCard'
import { StyledCardsWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Toolkit from 'pages/Toolkit'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import DiscoverSystemAgents from './components/DiscoverSystemAgents'
import DiscoverTeamAgents from './components/DiscoverTeamAgents'

import { useDiscover } from './useDiscover'

const Discover = () => {
  const { user } = React.useContext(AuthContext)

  const navigate = useNavigate()

  const { openModal } = useModal()

  const { templateAgents } = useDiscover()

  return (
    <StyledRoot>
      <DiscoverTeamAgents />

      {user && <DiscoverSystemAgents />}

      {/* {templateAgents?.length > 0 && (
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>
                AI Agents Powered by the Efforts of the Community
              </StyledSectionTitle>
              <StyledSectionDescription>
                Start a conversation with these exceptional AI talents today, or unleash your
                creativity and build your own.
              </StyledSectionDescription>
            </div>
          </StyledHeaderGroup>
          <ComponentsWrapper noPadding>
            <StyledCardsWrapper>
              {templateAgents?.map((agentObj: any, index: number) => {
                const { agent } = agentObj

                return (
                  <AgentCard
                    key={index}
                    name={agent.name}
                    description={agent.description}
                    onViewClick={() =>
                      openModal({
                        name: 'agent-view-modal',
                        data: { agent: agentObj },
                      })
                    }
                    onChatClick={() => navigate(`/chat/history?agent=${agent.id}`)}
                    headerTag={agent.role}
                    creator={agent.creator}
                    avatar={agent.avatar}
                  />
                )
              })}
            </StyledCardsWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      )} */}

      {/* {!user && <Toolkit isPublic />} */}
    </StyledRoot>
  )
}

export default Discover

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`
