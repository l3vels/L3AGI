import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useModal } from 'hooks'
import AgentCard from 'pages/Agents/AgentCard'

import { StyledCardsWrapper } from 'pages/Agents/Agents'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useNavigate } from 'react-router-dom'

import { useDiscover } from '../useDiscover'

const DiscoverSystemAgents = () => {
  const navigate = useNavigate()

  const { openModal } = useModal()

  const { systemAgents } = useDiscover()

  return (
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
  )
}

export default DiscoverSystemAgents
