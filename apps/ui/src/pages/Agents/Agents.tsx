import { useNavigate } from 'react-router-dom'
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
  const { agentsData, deleteAgentHandler } = useAgents()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Agents</StyledSectionTitle>
          <StyledSectionDescription>
            Here are all your agents, managing tasks and operations.
          </StyledSectionDescription>
        </div>

        <div>
          <Button onClick={() => navigate('/agents/create-agent')} size={Button.sizes.SMALL}>
            Create Agent
          </Button>
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {agentsData?.map((agentObj: any, index: number) => {
            const { agent } = agentObj

            return (
              <AgentCard
                key={index}
                name={agent.name}
                description={agent.description}
                onEditClick={() => navigate(`/agents/${agent.id}/edit-agent`)}
                onDeleteClick={() => deleteAgentHandler(agent.id)}
                onViewClick={() => navigate(`/agents/${agent.id}`)}
                headerTag={agent.role}
                onChatClick={() => navigate(`/copilot?agent=${agent.id}`)}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Agents

export const StyledCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  max-height: calc(100vh - 325px);
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
`
