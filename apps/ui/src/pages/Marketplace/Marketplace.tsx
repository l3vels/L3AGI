import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import AgentCard from 'pages/Agents/AgentCard'

import { StyledAgentCardsWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useMarketplace } from './useMarketplace'

const Marketplace = () => {
  const navigate = useNavigate()

  const { systemAgents, templateAgents } = useMarketplace()

  return (
    <StyledRoot>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <StyledTextWrapper>
            <StyledSectionTitle>Top-tier AI Thinkers</StyledSectionTitle>
            <StyledSectionDescription>
              Discover the foremost minds shaping AI's future with their innovative ideas
            </StyledSectionDescription>
          </StyledTextWrapper>
        </StyledHeaderGroup>
        <ComponentsWrapper>
          <StyledAgentCardsWrapper>
            {systemAgents?.map((agentObj: any, index: number) => {
              const { agent, configs } = agentObj

              return (
                <AgentCard
                  key={index}
                  title={agent.name}
                  subTitle={agent.description}
                  onViewClick={() => navigate(`/agents/${agent.id}`)}
                  modelVersion={configs.model_version}
                  provider={configs.mode_provider}
                />
              )
            })}
          </StyledAgentCardsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>

      {templateAgents?.length > 0 && (
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <StyledTextWrapper>
              <StyledSectionTitle>
                Evolving AI Virtuosos: Powered by the Community
              </StyledSectionTitle>
              <StyledSectionDescription>
                Witness the growth of exceptional AI talents, nurtured by collective community
                contributions.
              </StyledSectionDescription>
            </StyledTextWrapper>
          </StyledHeaderGroup>
          <ComponentsWrapper>
            <StyledAgentCardsWrapper>
              {templateAgents?.map((agentObj: any, index: number) => {
                const { agent, configs } = agentObj

                return (
                  <AgentCard
                    key={index}
                    title={agent.name}
                    subTitle={agent.description}
                    onViewClick={() => navigate(`/agents/${agent.id}`)}
                    modelVersion={configs.model_version}
                    provider={configs.mode_provider}
                  />
                )
              })}
            </StyledAgentCardsWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      )}
    </StyledRoot>
  )
}

export default Marketplace

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
