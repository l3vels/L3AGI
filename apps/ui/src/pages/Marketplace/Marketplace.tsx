import Button from '@l3-lib/ui-core/dist/Button'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import AgentCard from 'pages/Agents/AgentCard'

import { useAgents } from 'pages/Agents/useAgents'

import { StyledAgentCardsWrapper, StyledButtonWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import styled from 'styled-components'

const Marketplace = () => {
  const { agentsData, deleteAgentHandler, openEditAgentModal } = useAgents()

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
            {agentsData?.map((agentObj: any, index: number) => {
              const { agent, configs } = agentObj

              return (
                <AgentCard
                  key={index}
                  title={agent.name}
                  subTitle={agent.description}
                  onEditClick={() => openEditAgentModal(agentObj)}
                  onDeleteClick={() => deleteAgentHandler(agent.id)}
                  onViewClick={() => {}}
                  modelVersion={configs.model_version}
                  provider={configs.mode_provider}
                />
              )
            })}
          </StyledAgentCardsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <StyledTextWrapper>
            <StyledSectionTitle>Evolving AI Virtuosos: Powered by the Community</StyledSectionTitle>
            <StyledSectionDescription>
              Witness the growth of exceptional AI talents, nurtured by collective community
              contributions.
            </StyledSectionDescription>
          </StyledTextWrapper>
        </StyledHeaderGroup>
        <ComponentsWrapper>
          <StyledAgentCardsWrapper>
            {agentsData?.map((agentObj: any, index: number) => {
              const { agent, configs } = agentObj

              return (
                <AgentCard
                  key={index}
                  title={agent.name}
                  subTitle={agent.description}
                  onEditClick={() => openEditAgentModal(agentObj)}
                  onDeleteClick={() => deleteAgentHandler(agent.id)}
                  onViewClick={() => {}}
                  modelVersion={configs.model_version}
                  provider={configs.mode_provider}
                />
              )
            })}
          </StyledAgentCardsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
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
