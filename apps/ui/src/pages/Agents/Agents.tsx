import styled from 'styled-components'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from '@l3-lib/ui-core/dist/Button'
import AgentCard from './AgentCard'
import { useAgents } from './useAgents'

const Agents = () => {
  const { agentsData, openCreateAgentModal, deleteAgentHandler, openEditAgentModal } = useAgents()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledSectionTitle>Agents</StyledSectionTitle>

        <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription>
      </StyledHeaderGroup>
      <ComponentsWrapper>
        <StyledButtonWrapper>
          <Button onClick={openCreateAgentModal}>Create Agent</Button>
        </StyledButtonWrapper>
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
  )
}

export default Agents

export const StyledButtonWrapper = styled.div`
  margin-left: auto;
  margin-bottom: 20px;
`
const StyledAgentCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`
