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
import { ButtonPrimary } from 'components/Button/Button'

import HeadingPrimary from 'components/Heading/Primary'
import Heading from '@l3-lib/ui-core/dist/Heading'

const Agents = ({ isHome }: { isHome?: boolean }) => {
  const { agentsData, deleteAgentHandler } = useAgents()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledMainHeaderWrapper>
          <HeadingPrimary type={Heading.types.h1} size='medium' value='AGENTS' />
          <StyledSectionDescription>
            Here are all your agents, managing tasks and operations.
          </StyledSectionDescription>
        </StyledMainHeaderWrapper>
        {/* <div>

          <StyledSectionTitle>Agents</StyledSectionTitle>
          <StyledSectionDescription>
            Here are all your agents, managing tasks and operations.
          </StyledSectionDescription>
        </div> */}

        <div>
          {!isHome && (
            <ButtonPrimary
              onClick={() => navigate('/agents/create-agent-template')}
              size={Button.sizes.SMALL}
            >
              Create Agent
            </ButtonPrimary>
          )}
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
                onChatClick={() => navigate(`/chat?agent=${agent.id}`)}
                creator={agent.creator}
                avatar={agent.avatar}
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

  max-width: 1050px;
  width: 100%;
  max-height: calc(100vh - 325px);
  height: 100%;
  overflow-y: auto;
  padding: 5px;
`
const StyledMainHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
