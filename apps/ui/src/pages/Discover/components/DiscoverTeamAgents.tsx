import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useModal } from 'hooks'

import { StyledCardsWrapper } from 'pages/Agents/Agents'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import TeamOfAgentsCard from 'pages/TeamOfAgents/TeamOfAgentsCard'
import { useNavigate } from 'react-router-dom'
import { useTeamOfAgentsPublicService } from 'services/team/useTeamOfAgentsPublicService'

const DiscoverTeamAgents = () => {
  const navigate = useNavigate()

  const { openModal } = useModal()

  const { data: publicTeamAgents } = useTeamOfAgentsPublicService()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Discover Team of Agents</StyledSectionTitle>

          <StyledSectionDescription>
            Create and manage your team of AI agents for interactive experiences
          </StyledSectionDescription>
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {publicTeamAgents?.map((teamOfAgents: any) => {
            return (
              <TeamOfAgentsCard
                key={teamOfAgents.id}
                name={teamOfAgents.name}
                description={teamOfAgents.description}
                teamAgents={teamOfAgents.team_agents}
                onViewClick={() =>
                  openModal({
                    name: 'team-of-agent-view-modal',
                    data: { teamOfAgents: teamOfAgents },
                  })
                }
                onChatClick={() => navigate(`/chatHistory?team=${teamOfAgents.id}`)}
                creator={teamOfAgents.creator}
                avatar={teamOfAgents.avatar}
                teamType={teamOfAgents.team_type}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default DiscoverTeamAgents
