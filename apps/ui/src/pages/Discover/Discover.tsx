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

import { useDiscover } from './useDiscover'

const Discover = () => {
  const { user } = React.useContext(AuthContext)

  const navigate = useNavigate()

  const { openModal } = useModal()

  const { systemAgents, templateAgents } = useDiscover()

  const handleChatClick = (agentId: string) => {
    if (!user) {
      openModal({ name: 'login-modal' })
    } else {
      navigate(`/copilot?agent=${agentId}`)
    }
  }

  return (
    <StyledRoot>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Discover AI Agents built with L3</StyledSectionTitle>
            <StyledSectionDescription>
             Chat with the foremost minds shaping AI's future or create your own innovative ideas
            </StyledSectionDescription>
          </div>
        </StyledHeaderGroup>
        <ComponentsWrapper noPadding>
          <StyledCardsWrapper>
            {systemAgents?.map((agentObj: any, index: number) => {
              const { agent, configs } = agentObj

              return (
                <AgentCard
                  key={index}
                  name={agent.name}
                  description={agent.description}
                  onViewClick={() => navigate(`/agents/${agent.id}`)}
                  onChatClick={() => handleChatClick(agent.id)}
                  headerTag={agent.role}
                />
              )
            })}
          </StyledCardsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>

      {templateAgents?.length > 0 && (
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>
                AI Agents Powered by the Efforts of the Community
              </StyledSectionTitle>
              <StyledSectionDescription>
                Start a conversation with these exceptional AI talents today, or unleash your creativity and build your own.
              </StyledSectionDescription>
            </div>
          </StyledHeaderGroup>
          <ComponentsWrapper noPadding>
            <StyledCardsWrapper>
              {templateAgents?.map((agentObj: any, index: number) => {
                const { agent, configs } = agentObj

                return (
                  <AgentCard
                    key={index}
                    name={agent.name}
                    description={agent.description}
                    onViewClick={() => navigate(`/agents/${agent.id}`)}
                    onChatClick={() => handleChatClick(agent.id)}
                    headerTag={agent.role}
                  />
                )
              })}
            </StyledCardsWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      )}

      {!user && <Toolkit isPublic />}
    </StyledRoot>
  )
}

export default Discover

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`
